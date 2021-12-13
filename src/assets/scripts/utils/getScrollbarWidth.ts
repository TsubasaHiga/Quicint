const GetScrollbarWidth = (): number => {
  return window.innerWidth - document.body.clientWidth
}

export default GetScrollbarWidth
