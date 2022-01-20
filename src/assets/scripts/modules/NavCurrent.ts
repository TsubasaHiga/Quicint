import autoBind from 'auto-bind'

import GetClassName from '../utils/getClassName'
class NavCurrent {
  elements: NodeListOf<HTMLElement>
  bodyClassName: string

  constructor() {
    autoBind(this)

    this.elements = document.querySelectorAll('[data-indicator]')
    this.bodyClassName = GetClassName(document.body)

    this.checkCurrent()
  }

  checkCurrent(): void {
    const matches: HTMLElement[] = []

    this.elements.forEach((element) => {
      if (element.dataset.indicator?.match(this.bodyClassName)) {
        matches.push(element)
      }
    })

    if (matches.length) {
      matches.forEach((item) => {
        item.classList.add('is-current')
      })
    }
  }
}

export default NavCurrent
