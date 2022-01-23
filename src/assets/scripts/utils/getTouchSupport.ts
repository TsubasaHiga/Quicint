const isTouchDevice = require('is-touch-device')

/**
 * タッチサポート判定を行いbooleanで返します
 */
const GetTouchSupport = (): boolean => isTouchDevice()

export default GetTouchSupport
