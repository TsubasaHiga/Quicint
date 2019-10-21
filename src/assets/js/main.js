'use strict';

import objectFitImages from 'object-fit-images';
import lazysizes from 'lazysizes';
import SweetScroll from 'sweet-scroll';
import { throttle, debounce } from 'throttle-debounce';
import 'nodelist-foreach-polyfill';
import { el, define } from './define';
import { getDeviceType, closetPolyfill } from './functions';
import { page2 } from './page/page2';

/* ---------------------------------------------------------------- */

// closet polyfill.
closetPolyfill();

/**
 * hmbInit
 * @description ハンバーガーメニューの処理を行います
 */
const hmbInit = () => {
  let isActive = false;

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

  window.addEventListener(
    'resize',
    debounce(300, () => {
      if (isActive) {
        hide();
      }
    }),
    false
  );
};

window.addEventListener('load', () => {
  objectFitImages();
  hmbInit();

  if (define.bodyclass.match(/page-2/g)) {
    page2();
  }
});
