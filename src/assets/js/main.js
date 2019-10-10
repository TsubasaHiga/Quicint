'use strict';

import objectFitImages from 'object-fit-images';
import lazysizes from 'lazysizes';
import { throttle, debounce } from 'throttle-debounce';
import 'nodelist-foreach-polyfill';
import { el, define } from './define';
import { getDeviceType, closetPolyfill } from './functions';

/* ---------------------------------------------------------------- */

// closet polyfill.
closetPolyfill();

let deviceType;

window.addEventListener(
  'resize',
  debounce(300, () => {
    deviceType = getDeviceType();

  }),
  false
);

window.addEventListener('load', () => {
  objectFitImages();

  // Get deviceType.
  deviceType = getDeviceType();

});

// 横スクロールでｈeader動かす.
if (getDeviceType() === 'lg') {
  window.addEventListener('scroll', () => {
    el.header.style.left = -window.scrollX + 'px';
  });
}
