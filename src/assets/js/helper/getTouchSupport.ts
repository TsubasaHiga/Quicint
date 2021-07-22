import EL from '../constant/elements'

/**
 * タッチサポート判定を行い<html>のデータ属性にセットします
 * @return boolean isTouchSupport
 */
export default (): boolean => {
  const isTouchSupport = window.ontouchstart === null
  EL.HTML.dataset.touchsupport = isTouchSupport.toString()

  return isTouchSupport
}
