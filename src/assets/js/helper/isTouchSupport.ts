'use strict'

import EL from '../constant/elements'

/**
 * タッチサポート判定を行います
 */
export default () => {
  const isTouchSupport = (window.ontouchstart === null)
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string |... Remove this comment to see the full error message
  EL.HTML.dataset.touchsupport = isTouchSupport
}
