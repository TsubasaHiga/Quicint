import { values } from '~/const/values'

/**
 * breakpointとウインドウサイズを比較してlgかsmか取得します
 * @return string 'lg' or 'sm'
 */
const GetDeviceType = (): 'lg' | 'sm' => (window.innerWidth > values.BREAKPOINT ? 'lg' : 'sm')

export default GetDeviceType
