/**
 * orientationを取得します
 */
const GetOrientation = (): 'landscape' | 'portrait' => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  return isLandscape ? 'landscape' : 'portrait'
}

export default GetOrientation
