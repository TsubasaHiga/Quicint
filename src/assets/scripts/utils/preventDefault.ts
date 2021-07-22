/**
 * preventDefault
 */
const Pd = (e: Event): void => {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false)
}

export default Pd
