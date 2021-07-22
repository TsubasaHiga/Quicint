import EL from '../constant/elements'

const getOrientation = require('o9n').getOrientation

const SetOrientation = (): void => {
  const isLandscapeCheck = () => getOrientation().angle !== 0

  EL.HTML.dataset.orientation =
    isLandscapeCheck() === true ? 'landscape' : 'portrait'
}

export default SetOrientation
