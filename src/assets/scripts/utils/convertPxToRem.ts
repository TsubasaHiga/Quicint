const ConvertPxToRem = (px: number, base: number): number => {
  return (px / base) * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export default ConvertPxToRem
