'use strict'

/**
 * 可視領域に入った要素に対してクラスを付与します
 * @param {HTMLElement} targets 対象のHTML要素
 * @param {string} rootMargin rootMargin指定の文字列。省略時は'0% 0px'が指定されます。
 */
export default (targets: NodeListOf<HTMLElement>, rootMargin = '0% 0px'): void => {
  /**
   * 交差したときに呼び出す関数
   * @param {object} entries
   */
  const addClass = (entries: any) => {
    for (let i = 0; i < entries.length; i = (i + 1) | 0) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-animation')
      }
    }
  }

  const options = {
    root: null,
    rootMargin: rootMargin,
    threshold: 0
  }

  const observer = new IntersectionObserver(addClass, options)

  const y = window.scrollY || window.pageYOffset
  for (let i = 0; i < targets.length; i = (i + 1) | 0) {
    // 既に過ぎている要素には.is-animationclassを付与、
    // 過ぎていない要素のみobserverに渡す
    const posTop: number = targets[i].getBoundingClientRect().top
    const posY = posTop + y
    if (posY < y) {
      targets[i].classList.add('is-animation')
    } else {
      observer.observe(targets[i])
    }
  }
}
