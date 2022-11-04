import autoBind from 'auto-bind'
import { gsap, Power3 } from 'gsap'

import GetDeviceType from '~/utils/getDeviceType'

/**
 * 詳細開閉
 * @description 対象要素 '.c-details'
 */
class DetailsToggle {
  detailsList: NodeListOf<HTMLButtonElement>

  constructor() {
    autoBind(this)
    this.detailsList = document.querySelectorAll('[data-details-toggle]')

    if (this.detailsList.length <= 0) {
      return
    }

    this.detailsList.forEach((details) => {
      const btn = details.querySelector('[data-details-toggle-btn]')

      if (!btn) {
        return
      }

      this.setInitialOpen(details)
      btn.addEventListener('click', this.switchOpenClose, false)
    })
  }

  setInitialOpen(element: HTMLElement): void {
    const deviceType = GetDeviceType() as 'lg' | 'sm'
    const initialState = element.dataset[`${deviceType}InitialState`]
    if (!initialState) return

    if (initialState === 'open') this.open(element, false)
    if (initialState === 'close') this.close(element, false)
  }

  switchOpenClose(e: Event): void {
    const parent = (e.currentTarget as HTMLElement).parentNode as HTMLElement
    const state = parent.dataset.detailsToggle
    if (!state) return

    if (state === 'open') this.close(parent, true)
    if (state === 'close') this.open(parent, true)
  }

  open(element: HTMLElement, useAnimation: boolean): void {
    const content = element?.querySelector('[data-details-toggle-content]')
    if (!content) return

    const animate = {
      height: 'auto',
      ease: Power3.easeInOut
    }

    if (useAnimation) gsap.to(content, animate)
    if (!useAnimation) gsap.set(content, animate)

    element.dataset.detailsToggle = 'open'
  }

  close(element: HTMLElement, useAnimation: boolean): void {
    const content = element?.querySelector('[data-details-toggle-content]')
    if (!content) return

    const animate = {
      height: 0,
      ease: Power3.easeInOut
    }

    if (useAnimation) gsap.to(content, animate)
    if (!useAnimation) gsap.set(content, animate)

    element.dataset.detailsToggle = 'close'
  }
}

export default DetailsToggle
