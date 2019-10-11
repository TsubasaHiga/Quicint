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

const hmbInit = () => {

  let isActive  = false;

  const show = () => {
    isActive = true;
    el.html.classList.add('is-nav-active');
  };
  const hide = () => {
    isActive = false;
    el.html.classList.remove('is-nav-active');
  };

  el.hmb.addEventListener('click', () => {
    isActive ? hide() : show();
  });
  el.hmb__bg.addEventListener('click', () => {
    isActive ? hide() : show();
  });

  window.addEventListener('resize',debounce(300, () => {
    if (isActive) {
      hide();
    }
  }),false);
}

window.addEventListener('resize',debounce(300, () => {
  deviceType = getDeviceType();

}),false);

window.addEventListener('load', () => {
  objectFitImages();
  hmbInit();

  // Get deviceType.
  deviceType = getDeviceType();

});

// 横スクロールでｈeader動かす.
// if (getDeviceType() === 'lg') {
//   window.addEventListener('scroll', () => {
//     el.header.style.left = -window.scrollX + 'px';
//   });
// }
