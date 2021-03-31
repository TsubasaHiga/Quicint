'use strict'

/**
 * preventDefault
 * @param {object} event
 */
export default (event: any) => {
  event.preventDefault ? event.preventDefault() : event.returnValue = false
};
