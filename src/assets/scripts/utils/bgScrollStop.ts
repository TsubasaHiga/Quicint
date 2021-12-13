import GetScrollbarWidth from './getScrollbarWidth'

const bgScrollStop = (isStop = true): void => {
  document.body.style.paddingRight = isStop ? `${GetScrollbarWidth()}px` : ''

  if (isStop) {
    document.body.style.overflow = 'hidden'
  }

  if (!isStop) {
    document.body.style.overflow = ''
  }
}

export default bgScrollStop
