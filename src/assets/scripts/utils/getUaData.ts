import UAParser from 'ua-parser-js'

import UaType from '../types/UaType'

/**
 * UA情報を<html>タグにdatasetとして追加します
 * 文字列にスペースが付く場合はハイフンで繋がれます
 * @return uaString
 */
const GetUadata = (): UaType => {
  // @ts-ignore
  const ua = UAParser()
  const uaString = {
    browserName: ua.browser.name.toLowerCase().replace(' ', '-'),
    browserVersion: ua.browser.major,
    browserEngine: ua.engine.name.toLowerCase().replace(' ', '-'),
    osName: ua.os.name.toLowerCase().replace(' ', '-'),
    type:
      typeof ua.device.type !== 'undefined'
        ? ua.device.type.toLowerCase().replace(' ', '-')
        : 'laptop',
  }

  return uaString
}

export default GetUadata
