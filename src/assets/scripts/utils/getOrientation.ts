const GetOrientation = (): string => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  return isLandscape ? 'landscape' : 'portrait'
}

export default GetOrientation
