import autoBind from 'auto-bind'
import { gsap, Power2 } from 'gsap'
import { debounce } from 'throttle-debounce'

import BgScrollStop from '../utils/bgScrollStop'
class Modal {
  isModalOpen: boolean

  modalId: string

  modal: HTMLElement | null
  modalMain: HTMLElement | null
  modalContent: HTMLElement | null
  modalContentWrap: HTMLElement | null
  modalClose: HTMLElement | null
  modalBg: HTMLElement | null

  gsapInstance: GSAPTimeline | null

  debouncedHandleResize: any

  onModalOpenFunction: CallableFunction | null
  onModalHiddenFunction: CallableFunction | null

  type: string

  constructor(
    modalId: string,
    onModalOpenFunction: CallableFunction | null = null,
    onModalHiddenFunction: CallableFunction | null = null,
    type = 'y'
  ) {
    autoBind(this)

    this.isModalOpen = false

    // モーダルのターゲット情報
    this.modalId = modalId

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

    // onModalOpenFunction
    this.onModalOpenFunction = onModalOpenFunction ? onModalOpenFunction : null

    // onModalHiddenFunction
    this.onModalHiddenFunction = onModalHiddenFunction
      ? onModalHiddenFunction
      : null

    // モーダルのタイプ
    this.type = type
  }

  modalSearch(isOpen = false) {
    const modal = document.querySelector(
      `[data-modal="${this.modalId}"]`
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

    if (isOpen) this.modalOpen()
    this.modalClose?.addEventListener('click', this.modalHidden, false)
    this.modalBg?.addEventListener('click', this.modalHidden, false)
  }

  compareContentSizeH(addStyleIfContentSizeHLarger: boolean) {
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

  modalOpen() {
    type ModalAnimationType = {
      [key: string]: {
        from: GSAPTweenVars
        to: GSAPTweenVars
      }
    }
    const modalAnimation: ModalAnimationType = {
      slide: {
        from: {
          x: 10,
        },
        to: {
          x: 0,
          opacity: 1,
        },
      },
      y: {
        from: {
          y: 10,
        },
        to: {
          y: 0,
          opacity: 1,
        },
      },
    }

    this.gsapInstance = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: Power2.easeInOut,
          duration: 0.4,
        },
        onComplete: () => {
          this.modalClose?.classList.add('is-open')
          if (this.onModalOpenFunction) this.onModalOpenFunction()
        },
        onReverseComplete: () => {
          BgScrollStop(false)
          this.compareContentSizeH(false)
          if (this.onModalHiddenFunction) this.onModalHiddenFunction()
        },
      })
      .to(this.modal, 0.2, { opacity: 1, visibility: 'visible' })
      .fromTo(
        this.modalMain,
        modalAnimation[this.type].from,
        modalAnimation[this.type].to
      )

    BgScrollStop()
    this.gsapInstance.play()
    this.compareContentSizeH(true)

    window.addEventListener('resize', this.debouncedHandleResize, false)

    this.isModalOpen = true
  }

  modalHidden() {
    if (!this.isModalOpen) {
      return
    }

    this.modalClose?.classList.remove('is-open')
    this.gsapInstance?.reverse()

    this.modalClose?.removeEventListener('click', this.modalHidden)
    this.modalBg?.removeEventListener('click', this.modalHidden)
    window.removeEventListener('resize', this.debouncedHandleResize)

    this.isModalOpen = false
  }

  onResize() {
    this.compareContentSizeH(false)
    this.compareContentSizeH(true)
  }
}

export default Modal
