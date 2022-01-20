import autoBind from 'auto-bind'
import { gsap, Power3 } from 'gsap'
import queryString from 'query-string'
import { debounce } from 'throttle-debounce'

import AddQueryString from '../utils/addQueryString'
import BgScrollStop from '../utils/bgScrollStop'
import GetEventPath from '../utils/getEventPath'
import removeQueryString from '../utils/removeQueryString'

class Modal {
  isModalOpen: boolean

  buttons: NodeListOf<HTMLButtonElement>

  btnModalId: string

  modal: HTMLElement | null
  modalMain: HTMLElement | null
  modalContent: HTMLElement | null
  modalClose: HTMLElement | null
  modalBg: HTMLElement | null

  gsapInstance: GSAPTimeline | null

  debouncedHandleResize: any

  constructor() {
    autoBind(this)

    this.isModalOpen = false

    // モーダルを開くキッカケのボタンの要素
    this.buttons = document.querySelectorAll('[data-modal-btn]')

    // モーダルのターゲット情報
    this.btnModalId = ''

    // モーダル自体の要素
    this.modal = null
    this.modalMain = null
    this.modalContent = null
    this.modalClose = null
    this.modalBg = null

    // GSAPのインスタンス
    this.gsapInstance = null

    // リサイズ時の処理
    this.debouncedHandleResize = debounce(100, this.onResize)

    if (this.buttons.length <= 0) {
      return
    }

    this.buttons.forEach((button) => {
      button.addEventListener(
        'click',
        (e) => {
          this.btnModalId = String(button.dataset.modalBtn)

          const includeNodeNameA = GetEventPath(e).some(
            (path) => (path as HTMLElement).nodeName === 'A'
          )

          if (this.btnModalId.length <= 0 || includeNodeNameA) {
            return
          }

          this.modalSearch()
        },
        false
      )
    })

    this.modalSelect()
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
    this.modalClose = modal.querySelector('[data-modal-close]')
    this.modalBg = modal.querySelector('[data-modal-bg]')

    if (
      !this.modalMain ||
      !this.modalContent ||
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

    window.removeEventListener('resize', this.debouncedHandleResize)

    removeQueryString('modal')

    this.isModalOpen = false
  }

  onResize(): void {
    this.compareContentSizeH(false)
    this.compareContentSizeH(true)
  }
}

export default Modal
