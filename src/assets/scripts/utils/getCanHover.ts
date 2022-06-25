const GetCanHover = (): boolean => {
  const isHover = window.matchMedia('(hover: hover)').matches
  const isPointerFine = window.matchMedia('(pointer: fine)').matches

  return isHover && isPointerFine
}

export default GetCanHover
