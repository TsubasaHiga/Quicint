/**
 * classNamesを配列で取得します
 * @return string[]
 */
const GetClassNames = (target: HTMLElement): string[] => String(target.classList).split(' ')

export default GetClassNames
