import GetStylePropertyValue from './getStylePropertyValue'

/**
 * CSSカスタムプロパティーを数字で取得します
 */
const GetStylePropertyValueToNumber = (key: string): number => parseInt(GetStylePropertyValue(key)) || 0

export default GetStylePropertyValueToNumber
