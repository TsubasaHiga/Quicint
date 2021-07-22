import EL from '../constant/elements'
import getClassName from './getClassName'

/**
 * ナビのカレント処理を提供します
 */
export default (): void => {
  const targets: NodeListOf<HTMLElement> =
    document.querySelectorAll('[data-indicator]')
  const className = getClassName(EL.BODY)

  /**
   * currentUpdater
   */
  const currentUpdater = () => {
    const matches = []

    for (let i = 0; i < targets.length; i = (i + 1) | 0) {
      if (targets[i].dataset.indicator?.match(className)) {
        matches.push(targets[i])
      }
    }

    if (matches.length) {
      for (let i = 0; i < matches.length; i = (i + 1) | 0) {
        matches[i].classList.add('is-nav-current')
      }
    }
  }

  currentUpdater()
}