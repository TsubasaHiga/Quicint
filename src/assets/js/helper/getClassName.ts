/* eslint-disable */
'use strict'

/**
 * 特定の要素のクラスを取得して文字列で返します
 * @param {HTMLElement} target 対象のHTML要素
 * @return string className
 */
export default (target: any): string => target.classList[0]
