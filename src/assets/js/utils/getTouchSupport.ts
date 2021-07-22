/**
 * タッチサポート判定を行い<html>のデータ属性にセットします
 */
const GetTouchSupport = (): boolean => window.ontouchstart === null

export default GetTouchSupport
