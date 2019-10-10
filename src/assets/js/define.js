'use strict';

/**
 * 変数
 * @description 変数及び基本要素の指定を行います
 */
export const el = {
  html   : document.getElementsByTagName('html')[0],
  body   : document.getElementsByTagName('body')[0],
  header : document.getElementsByTagName('header')[0]
};

const bodyclass = el.body.classList.value;

export const define = {
  breakpoint       : 767,
  bodyclass        : bodyclass,
  scroll_offset_lg : -123,
  scroll_offset_sm : -110
};
