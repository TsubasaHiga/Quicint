import autoBind from 'auto-bind'
import { gsap, Power3 } from 'gsap'
import queryString from 'query-string'
import { debounce } from 'throttle-debounce'

import AddQueryString from '../utils/addQueryString'
import BgScrollStop from '../utils/bgScrollStop'
import removeQueryString from '../utils/removeQueryString'

class Modal {
  isModalOpen: boolean

  btnModalId: string

  modal: HTMLElement | null
  modalMain: HTMLElement | null
  modalContent: HTMLElement | null
  modalContentWrap: HTMLElement | null
  modalClose: HTMLElement | null
  modalBg: HTMLElement | null

  gsapInstance: GSAPTimeline | null

  debouncedHandleResize: any

  onModalHiddenFunction: CallableFunction | null

  constructor(onModalHiddenFunction: CallableFunction | null = null) {
    autoBind(this)

    this.isModalOpen = false

    // モーダルのターゲット情報
    this.btnModalId = ''

    // モーダル自体の要素
    this.modal = null
    this.modalMain = null
    this.modalContent = null
    this.modalContentWrap = null
    this.modalClose = null
    this.modalBg = null

    // GSAPのインスタンス
    this.gsapInstance = null

    // リサイズ時の処理
    this.debouncedHandleResize = debounce(100, this.onResize)

    // onModalHiddenFunction
    this.onModalHiddenFunction = onModalHiddenFunction
      ? onModalHiddenFunction
      : null

    this.modalSelect()
  }

  modalManualOpen(modalId: string): void {
    this.btnModalId = modalId
    this.modalSearch()
  }

  modalSelect(): void {
    // 既にモーダルが開いている時は終了
    if (this.isModalOpen) {
      return
    }

    const queryParsed = queryString.parse(window.location.search, {
      arrayFormat: 'comma',
    })

    if (queryParsed.modal) {
      // クエリ文字列が含まれていない場合は終了
      if (queryParsed.modal.length < 1) {
        return
      }

      this.btnModalId = queryParsed.modal[1]

      this.modalSearch()
    }

    if (!queryParsed.modal) {
      this.modalHidden()
    }
  }

  modalSearch(): void {
    console.log(this.btnModalId)

    const modal = document.querySelector(
      `[data-modal="${this.btnModalId}"]`
    ) as HTMLElement

    if (!modal) {
      return
    }

    this.modal = modal
    this.modalMain = modal.querySelector('[data-modal-main]')
    this.modalContent = modal.querySelector('[data-modal-content]')
    this.modalContentWrap = modal.querySelector('[data-modal-content-wrap]')
    this.modalClose = modal.querySelector('[data-modal-close]')
    this.modalBg = modal.querySelector('[data-modal-bg]')

    if (
      !this.modalMain ||
      !this.modalContent ||
      !this.modalContentWrap ||
      !this.modalClose ||
      !this.modalBg
    ) {
      return
    }

    this.modalOpen()
    this.modalClose?.addEventListener('click', this.modalHidden, false)
    this.modalBg?.addEventListener('click', this.modalHidden, false)
  }

  compareContentSizeH(addStyleIfContentSizeHLarger: boolean): void {
    if (!this.modalMain || !this.modalContent) {
      return
    }

    if (addStyleIfContentSizeHLarger) {
      if (
        this.modalContent.getBoundingClientRect().height >
        this.modalMain.getBoundingClientRect().height
      ) {
        this.modalMain.style.height = '100%'
      }
    }

    if (!addStyleIfContentSizeHLarger) {
      this.modalMain.style.height = ''
    }
  }

  modalOpen(): void {
    AddQueryString('modal', `modal,${this.btnModalId}`)

    this.gsapInstance = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: Power3.easeInOut,
          duration: 0.4,
        },
        onComplete: () => {
          this.modalClose?.classList.add('is-open')
        },
        onReverseComplete: () => {
          BgScrollStop(false)
          this.compareContentSizeH(false)
        },
      })
      .to(this.modal, { opacity: 1, visibility: 'visible' })
      .to(this.modalMain, { y: 0, opacity: 1 })

    BgScrollStop()
    this.gsapInstance.play()
    this.compareContentSizeH(true)

    window.addEventListener('resize', this.debouncedHandleResize, false)

    this.isModalOpen = true
  }

  modalHidden(): void {
    this.modalClose?.classList.remove('is-open')
    this.gsapInstance?.reverse()

    this.modalClose?.removeEventListener('click', this.modalHidden)
    this.modalBg?.removeEventListener('click', this.modalHidden)
    window.removeEventListener('resize', this.debouncedHandleResize)

    removeQueryString('modal')

    if (this.onModalHiddenFunction) {
      this.onModalHiddenFunction()
    }

    this.isModalOpen = false
  }

  onResize(): void {
    this.compareContentSizeH(false)
    this.compareContentSizeH(true)
  }
}

export default Modal
