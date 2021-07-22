'use strict'

/**
 * preventDefault
 * @param {object} e
 */
export default (e: Event): void => {
  e.preventDefault ? e.preventDefault() : e.returnValue = false
}
