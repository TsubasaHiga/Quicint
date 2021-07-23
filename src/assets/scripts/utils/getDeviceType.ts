import DEFINE from '../constant/define'

/**
 * breakpointとウインドウサイズを比較してlgかsmか返します
 * @return string 'lg' or 'sm'
 */
const GetDeviceType = (): string => {
  return window.innerWidth > DEFINE.BREAKPOINT ? 'lg' : 'sm'
}

export default GetDeviceType
