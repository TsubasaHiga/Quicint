'use strict'

/**
 * preventDefault
 */
export default event => {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
}
