/**
 * 文字列を真偽値に変換します
 */
const ToBoolean = (booleanStr: string | null): boolean => {
  return booleanStr ? booleanStr.toLowerCase() === 'true' : false
}

export default ToBoolean
