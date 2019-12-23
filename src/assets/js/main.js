'use strict'

import DEFINE from './constant/define'
import EL from './constant/elements'

import getDeviceType from './helper/getDeviceType'
import closetPolyfill from './helper/polyfillCloset'

import objectFitImages from 'object-fit-images'
import Stickyfill from 'stickyfilljs'
import lazysizes from 'lazysizes'
import SweetScroll from 'sweet-scroll'
import { throttle, debounce } from 'throttle-debounce'
import 'nodelist-foreach-polyfill'
import UAParser from 'ua-parser-js'

import pageNameTop from './page/page-top'
import pageName2 from './page/page-2'
import pageName3 from './page/page-3'

// closet polyfill.
closetPolyfill()

/**
 * ハンバーガーメニューの処理を行います
 */
const hmbInit = () => {
  let isActive = false

  const show = () => {
    isActive = true
    EL.HTML.classList.add('is-nav-active')
  }

  const hide = () => {
    isActive = false
    EL.HTML.classList.remove('is-nav-active')
  }

  EL.HMB.addEventListener('click', () => {
    isActive ? hide() : show()
  })

  EL.HMBBG.addEventListener('click', () => {
    isActive ? hide() : show()
  })

  window.addEventListener(
    'resize',
    debounce(300, () => {
      if (isActive) {
        hide()
      }
    }),
    false
  )
}

/**
 * ナビのカレント処理を行います
 */
const navCurrent = (target) => {
  for (let i = 0; i < target.length; i++) {
    if (DEFINE.BODYCLASS === target[i].dataset.linkname) {
      target[i].classList.add('is-active')
      break
    }
  }
}

/**
 * UA情報を<html>タグにdatasetとして追加します
 * 文字列にスペースが付く場合はハイフンで繋がれます
 */
const addUaDataset = () => {
  const ua = UAParser()
  const uaString = {
    browserName: (ua.browser.name).toLowerCase().replace(' ', '-'),
    osName: (ua.os.name).toLowerCase().replace(' ', '-')
  }
  EL.HTML.dataset.browser = uaString.browserName
  EL.HTML.dataset.os = uaString.osName
}

window.addEventListener('load', () => {
  // set ua dataset
  addUaDataset()

  // Polyfill object-fit
  objectFitImages()

  // stickyfilljs
  Stickyfill.add(EL.STICKY)

  // ハンバーガーメニュー
  hmbInit()

  // ナビカレント
  navCurrent(EL.NAV)

  // page-top
  if (DEFINE.BODYCLASS.match(/page-top/g)) {
    pageNameTop()
  }

  // page2
  if (DEFINE.BODYCLASS.match(/page-2/g)) {
    pageName2()
  }

  // page3
  if (DEFINE.BODYCLASS.match(/page-3/g)) {
    pageName3()
  }
})
