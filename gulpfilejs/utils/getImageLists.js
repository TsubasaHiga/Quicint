'use strict'

const paths = require('../constant/paths')
const setting = require(paths.setting)

const getImageLists = (onlyManual) => {
  // defaultLists
  const defaultLists = setting.io.input.images + '**/*.{png,apng,jpg,gif,svg,ico}'

  // lists
  const lists = []

  if (onlyManual) {
    // push imageManualLists
    for (let i = 0; i < setting.imageManualLists.length; i = (i + 1) | 0) {
      lists.push(setting.io.input.images + setting.imageManualLists[i])
    }
  } else {
    // push defaultLists
    lists.push(defaultLists)

    // push ignore imageManualLists
    for (let i = 0; i < setting.imageManualLists.length; i = (i + 1) | 0) {
      lists.push('!' + setting.io.input.images + setting.imageManualLists[i])
    }
  }

  return lists
}

module.exports = getImageLists
