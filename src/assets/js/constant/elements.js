'use strict'

// よく使用するElements
export default {
  HTML: document.getElementsByTagName('html')[0],
  BODY: document.getElementsByTagName('body')[0],
  HEADER: document.getElementsByTagName('header')[0],
  MAIN: document.getElementsByTagName('main')[0],
  FOOTER: document.getElementsByTagName('footer')[0],
  MAINWRAP: document.querySelector('.mainwrap'),
  MAINWRAPINNER: document.querySelector('.mainwrap__inner'),
  NAV: document.querySelectorAll('.l-nav__link'),
  HMB: document.querySelector('#hmb'),
  HMBBG: document.querySelector('#hmb__bg'),
  STICKY: document.querySelectorAll('.sticky'),
  ALLLINKS: document.querySelectorAll('a:not([target="_blank"])')
}
