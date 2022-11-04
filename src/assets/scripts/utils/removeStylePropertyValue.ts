/**
 * CSSカスタムプロパティーを削除します
 */
const RemoveStylePropertyValue = (key: string): void => {
  document.documentElement.style.removeProperty(key)
}

export default RemoveStylePropertyValue
