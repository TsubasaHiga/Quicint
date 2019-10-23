'use strict';

/**
 * 変数
 * @description 変数及び基本要素の指定を行います
 */
export const el = {
  html    : document.getElementsByTagName('html')[0],
  body    : document.getElementsByTagName('body')[0],
  header  : document.getElementsByTagName('header')[0],
  main    : document.getElementsByTagName('main')[0],
  footer  : document.getElementsByTagName('footer')[0],
  nav     : document.querySelectorAll('.l-nav__link'),
  hmb     : document.querySelector('#hmb'),
  hmb__bg : document.querySelector('#hmb__bg'),
  sticky  : document.querySelectorAll('.sticky')
};

export const define = {
  breakpoint : 767,
  bodyclass  : el.body.classList.value
};
