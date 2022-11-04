/**
 * CSSカスタムプロパティーを取得します
 */
const GetStylePropertyValue = (key: string): string => getComputedStyle(document.documentElement).getPropertyValue(key)

export default GetStylePropertyValue
