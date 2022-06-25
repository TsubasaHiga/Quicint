import GetUaData from './getUaData'

const IsSafari = (includeMobileSafari = true): boolean => {
  const clientData = GetUaData()

  if (includeMobileSafari) {
    return (
      clientData.browserName === 'safari' ||
      clientData.browserName === 'mobile-safari'
    )
  }

  return clientData.browserName === 'safari'
}

export default IsSafari
