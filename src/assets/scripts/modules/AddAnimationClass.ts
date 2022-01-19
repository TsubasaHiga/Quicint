/**
 * 可視領域に入った要素に対してクラスを付与します
 */
const AddAnimationClass = (
  targets: NodeListOf<HTMLElement>,
  rootMargin = '0% 0px'
): void => {
  /**
   * 交差したときに処理
   * @param {object} entries
   */
  const addClass = (entries: IntersectionObserverEntry[]) => {
    for (let i = 0; i < entries.length; i = (i + 1) | 0) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-animation')
      }
    }
  }

  const options = {
    root: null,
    rootMargin: rootMargin,
    threshold: 0,
  }

  const observer = new IntersectionObserver(addClass, options)

  const y = window.scrollY || window.pageYOffset
  for (let i = 0; i < targets.length; i = (i + 1) | 0) {
    const posTop: number = targets[i].getBoundingClientRect().top
    const posY = posTop + y
    if (posY < y) {
      targets[i].classList.add('is-animation')
    } else {
      observer.observe(targets[i])
    }
  }
}

export default AddAnimationClass
