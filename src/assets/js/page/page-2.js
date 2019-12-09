'use strict'
import DEFINE from '../constant/define'
import EL from '../constant/elements'

import 'nodelist-foreach-polyfill'
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'

export default () => {
  console.warn('page2')

  const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
}
