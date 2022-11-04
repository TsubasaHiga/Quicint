/**
 * elementの配列の内、nullが存在するかどうかを判定します
 * @param elements HTMLElement[]
 * @returns boolean
 */
const IsExistAllElements = (elements: (HTMLElement | null)[]): boolean => {
  return elements.length > 0 && elements.every((element) => element !== null)
}

export default IsExistAllElements
