const ToBoolean = (booleanStr: string | null): boolean => {
  return booleanStr ? booleanStr.toLowerCase() === 'true' : false
}

export default ToBoolean
