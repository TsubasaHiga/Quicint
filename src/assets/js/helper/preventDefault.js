'use strict'

/**
 * preventDefault
 * @param {object} event
 */
export default event => {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
}
