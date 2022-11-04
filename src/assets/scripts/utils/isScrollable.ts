/**
 * スクロール可能かどうかを判定します
 */
const IsScrollable = (element: HTMLElement): boolean => element.scrollWidth > element.clientWidth

export default IsScrollable
