'use strict';

import objectFitImages from 'object-fit-images';
import Stickyfill from 'stickyfilljs';
import lazysizes from 'lazysizes';
import SweetScroll from 'sweet-scroll';
import { throttle, debounce } from 'throttle-debounce';
import 'nodelist-foreach-polyfill';
import { el, define } from './define';
import { getDeviceType, closetPolyfill } from './functions';

import { pageNameTop } from './page/page-top';
import { pageName2 } from './page/page-2';
import { pageName3 } from './page/page-3';

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

/**
 * navCurrent
 * @description ナビのカレント処理を行います
 */
const navCurrent = target => {
  for (let i = 0; i < target.length; i++) {
    if (define.bodyclass === target[i].dataset.linkname) {
      target[i].classList.add('is-active');
      break;
    }
  }
};

window.addEventListener('load', () => {
  // Polyfill object-fit
  objectFitImages();

  // stickyfilljs
  Stickyfill.add(el.sticky);

  // ハンバーガーメニュー
  hmbInit();

  // ナビカレント
  navCurrent(el.nav);

  // page-top
  if (define.bodyclass.match(/page-top/g)) {
    pageNameTop();
  }

  // page2
  if (define.bodyclass.match(/page-2/g)) {
    pageName2();
  }

  // page3
  if (define.bodyclass.match(/page-3/g)) {
    pageName3();
  }
});
