'use strict'

/**
 * 可視領域に入った要素に対してクラスを付与します
 * @param {string} rootMargin
 */
export default (targets, rootMargin = '-19% 0px') => {
  /**
   * 交差したときに呼び出す関数
   * @param {object} entries
   */
  const addClass = entries => {
    for (let i = 0; i < entries.length; i = (i + 1) | 0) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-animation')
      } else {
        // entries[i].target.classList.remove('is-animation')
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
    // observer.observe(targets[i])

    // 既に過ぎている要素には.is-animationclassを付与、
    // 過ぎていない要素のみobserverに渡す
    const pos = targets[i].getBoundingClientRect()
    const posY = pos.top + y
    if (posY < y) {
      targets[i].classList.add('is-animation')
    } else {
      observer.observe(targets[i])
    }
  }
}
