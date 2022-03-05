import RemoveAttribute from './removeAttribute'
import SetAttribute from './setAttribute'

const DisplayElement = (state: boolean, element: HTMLButtonElement): void => {
  if (state) RemoveAttribute(element, 'disabled')
  if (!state) SetAttribute(element, 'disabled', 'disabled')
}

export default DisplayElement
