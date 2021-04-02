'use strict'

import 'url-search-params-polyfill'

/**
 * URLのパラメーターを返します
 * @link https://qiita.com/ttiger55/items/22e0f676ff6101336eaf
 * @return {object} params
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export default (): Record<string, unknown> => [...(new URLSearchParams(location.search) as any).entries()].reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {})
