import autoBind from 'auto-bind'
import { gsap, Power3 } from 'gsap'

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

      btn.addEventListener(
        'click',
        (e) => {
          const parent = (e.currentTarget as HTMLElement)
            .parentNode as HTMLElement
          const state = parent.dataset.detailsToggle

          if (!state) {
            return
          }

          if (state === 'open') this.close(parent)
          if (state === 'close') this.open(parent)
        },
        false
      )
    })
  }

  open(element: HTMLElement): void {
    const content = element?.querySelector('[data-details-toggle-content]')

    if (!content) {
      return
    }

    gsap.to(content, {
      height: 'auto',
      ease: Power3.easeInOut,
    })

    element.dataset.detailsToggle = 'open'
  }

  close(element: HTMLElement): void {
    const content = element?.querySelector('[data-details-toggle-content]')

    if (!content) {
      return
    }

    gsap.to(content, {
      height: 0,
      ease: Power3.easeInOut,
    })

    element.dataset.detailsToggle = 'close'
  }
}

export default DetailsToggle
