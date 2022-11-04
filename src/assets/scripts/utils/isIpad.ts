import GetOrientation from './getOrientation'
import GetUaData from './getUaData'

/**
 * iPadかどうかを判定します
 */
const IsIpad = (orientation = 'portrait'): boolean => {
  const clientData = GetUaData()

  if (!clientData.touchSupport) return false

  return (
    clientData.type === 'laptop' &&
    clientData.osName === 'mac-os' &&
    clientData.browserName === 'safari' &&
    clientData.touchSupport &&
    GetOrientation() === orientation
  )
}

export default IsIpad
