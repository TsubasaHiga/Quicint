/**
 * CSSカスタムプロパティーをセットします
 * @param key string
 * @param value string
 */
const SetStylePropertyValue = (key: string, value: string): void => {
  document.documentElement.style.setProperty(key, value)
}

export default SetStylePropertyValue
