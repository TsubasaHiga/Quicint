type attrType = {
  id: string
  width: number
  height: number
}

const GenYouTubeIframeElement = (attr: attrType): HTMLIFrameElement => {
  const iframe = document.createElement('iframe')

  iframe.width = String(attr.width)
  iframe.height = String(attr.height)
  iframe.src = `https://www.youtube.com/embed/${attr.id}?rel=0&playsinline=1&enablejsapi=1`
  iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  iframe.allowFullscreen = true

  return iframe
}

export default GenYouTubeIframeElement
