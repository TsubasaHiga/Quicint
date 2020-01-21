'use strict'

import EL from '../constant/elements'
import { throttle, debounce } from 'throttle-debounce'

/**
 * ハンバーガーメニューの処理を行います
 */
export default () => {
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
