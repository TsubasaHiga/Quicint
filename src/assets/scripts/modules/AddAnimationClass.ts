import autoBind from 'auto-bind'

import GetDeviceType from '../utils/getDeviceType'

type typeOptions = {
  root: null | HTMLElement
  rootMargin: string
  threshold: number
}
class AddAnimationClass {
  elements: NodeListOf<HTMLElement>
  options: typeOptions

  constructor(
    rootMargin = {
      lg: '0% 0px',
      sm: '0% 0px',
    }
  ) {
    autoBind(this)

    this.elements = document.querySelectorAll('.u-animation')

    this.options = {
      root: null,
      rootMargin: GetDeviceType() === 'g' ? rootMargin.lg : rootMargin.sm,
      threshold: 0,
    }

    if (this.elements.length <= 0) {
      return
    }

    this.init()
  }

  init(): void {
    const y = window.scrollY || window.pageYOffset

    const observer = new IntersectionObserver(this.addClass, this.options)

    this.elements.forEach((element) => {
      const posTop: number = element.getBoundingClientRect().top
      const posY = posTop + y

      if (posY < y) {
        element.classList.add('is-animation')
      } else {
        observer.observe(element)
      }
    })
  }

  addClass(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-animation')
      }
    })
  }
}

export default AddAnimationClass
