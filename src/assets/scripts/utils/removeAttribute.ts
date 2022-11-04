/**
 * attributeを削除します
 */
const RemoveAttribute = (element: HTMLElement, attribute: string) => {
  element.removeAttribute(attribute)
}

export default RemoveAttribute
