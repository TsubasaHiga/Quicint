/**
 * eventのpathを取得します
 * @link https://gist.github.com/leofavre/d029cdda0338d878889ba73c88319295
 * ES6版に書き直し
 */
const GetEventPaths = (evt: any): Node[] | Window[] => {
  let path = (evt.composedPath && evt.composedPath()) || evt.path
  const target = evt.target

  if (path != null) {
    // Safari doesn't include Window, and it should.
    path = path.indexOf(window) < 0 ? path.concat([window]) : path
    return path
  }

  if (target === window) {
    return [window]
  }

  const getParents = (node: Node, memo: Node[]): Node[] => {
    memo = memo || []
    const parentNode = node.parentNode

    if (!parentNode) {
      return memo
    } else {
      return getParents(parentNode, memo.concat([parentNode]))
    }
  }

  return [target].concat(getParents(target, [])).concat([window])
}

export default GetEventPaths
