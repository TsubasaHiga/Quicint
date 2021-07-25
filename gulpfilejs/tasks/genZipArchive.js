'use strict'

require('date-utils')
const fs = require('fs')
const paths = require('../constant/paths')

const genDir = require('../utils/genDir')

const genZipArchive = (cb) => {
  // サイト設定ファイルの読み込み.
  const siteSetting = JSON.parse(fs.readFileSync(paths.settingSite, 'utf8'))

  // 納品ファイル作成
  const dt = new Date()
  const date = dt.toFormat('YYYYMMDD-HH24MI')
  const dirname = siteSetting.publishFileName + '_ProdBuild_' + date
  genDir(dirname, 'zip')
  cb()
}

module.exports = genZipArchive
