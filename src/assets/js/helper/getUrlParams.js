'use strict'

import 'url-search-params-polyfill'

/**
 * URLのパラメーターを返します
 * @link https://qiita.com/ttiger55/items/22e0f676ff6101336eaf
 * @return {object} params
 */
export default () => {
  return [...new URLSearchParams(location.search).entries()].reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {})
}
