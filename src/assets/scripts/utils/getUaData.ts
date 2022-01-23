import UAParser from 'ua-parser-js'

import UaType from '../types/UaType'
import GetTouchSupport from './getTouchSupport'

/**
 * UA情報を<html>タグにdatasetとして追加します
 * 文字列にスペースが付く場合はハイフンで繋がれます
 * @return uaString
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
    browserEngine: browserEngine
      ? browserEngine.toLowerCase().replace(' ', '-')
      : '',
    osName: osName ? osName.toLowerCase().replace(' ', '-') : '',
    type:
      typeof type !== 'undefined'
        ? type.toLowerCase().replace(' ', '-')
        : 'laptop',
    touchSupport: GetTouchSupport(),
  }

  return uaString
}

export default GetUaData
