import UAParser from 'ua-parser-js'

import UaType from '~/types/UaType'

import IsTouchSupport from './isTouchSupport'

/**
 * UA情報を取得します
 */
const GetUaData = (): UaType => {
  const parser = new UAParser()
  const result = parser.getResult()

  const browserName = result.browser.name
  const browserVersion = result.browser.major
  const browserEngine = result.engine.name
  const osName = result.os.name
  const type = result.device.type

  const uaString = {
    browserName: browserName ? browserName.toLowerCase().replace(' ', '-') : '',
    browserVersion: browserVersion ? browserVersion : '',
    browserEngine: browserEngine ? browserEngine.toLowerCase().replace(' ', '-') : '',
    osName: osName ? osName.toLowerCase().replace(' ', '-') : '',
    type: typeof type !== 'undefined' ? type.toLowerCase().replace(' ', '-') : 'laptop',
    touchSupport: IsTouchSupport()
  }

  return uaString
}

export default GetUaData
