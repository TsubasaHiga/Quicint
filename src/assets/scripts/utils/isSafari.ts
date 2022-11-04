import GetUaData from './getUaData'

/**
 * Safariかどうかを判定します
 */
const IsSafari = (includeMobileSafari = true): boolean => {
  const clientData = GetUaData()

  if (includeMobileSafari) {
    return clientData.browserName === 'safari' || clientData.browserName === 'mobile-safari'
  }

  return clientData.browserName === 'safari'
}

export default IsSafari
