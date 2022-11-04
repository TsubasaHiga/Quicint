import isTouchDevice from 'is-touch-device'

/**
 * タッチサポートを判定します
 */
const IsTouchSupport = (): boolean => isTouchDevice()

export default IsTouchSupport
