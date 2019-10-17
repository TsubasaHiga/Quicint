'use strict';
import { el, define } from './define';
import 'nodelist-foreach-polyfill';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';

/* ---------------------------------------------------------------- */

export const page2 = () => {
  const mySwiper = new Swiper ('.swiper-container', {
    loop       : true,
    pagination : {
      el : '.swiper-pagination',
    },
    navigation : {
      nextEl : '.swiper-button-next',
      prevEl : '.swiper-button-prev',
    },
  })
};
