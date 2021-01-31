'use strict'

export default {
  HTML: document.getElementsByTagName('html')[0],
  BODY: document.getElementsByTagName('body')[0],
  HEADER: document.getElementsByTagName('header')[0],
  MAIN: document.getElementsByTagName('main')[0],
  FOOTER: document.getElementsByTagName('footer')[0],
  NAV: document.querySelectorAll('.l-nav__link'),
  HMB: document.querySelector('#hmb'),
  HMBBG: document.querySelector('#hmb__bg'),
  STICKY: document.querySelectorAll('.sticky')
}
