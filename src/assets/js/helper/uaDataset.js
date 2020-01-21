'use strict'

import EL from '../constant/elements'
import UAParser from 'ua-parser-js'

/**
 * UA情報を<html>タグにdatasetとして追加します
 * 文字列にスペースが付く場合はハイフンで繋がれます
 */
export default () => {
  const ua = UAParser()
  const uaString = {
    browserName: ua.browser.name.toLowerCase().replace(' ', '-'),
    browserVersion: ua.browser.major,
    osName: ua.os.name.toLowerCase().replace(' ', '-'),
    type: (typeof ua.device.type !== 'undefined') ? ua.device.type.toLowerCase().replace(' ', '-') : 'laptop'
  }
  EL.HTML.dataset.browser = uaString.browserName
  EL.HTML.dataset.browserversion = uaString.browserVersion
  EL.HTML.dataset.os = uaString.osName
  EL.HTML.dataset.type = uaString.type
}
