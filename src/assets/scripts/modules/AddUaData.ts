import autoBind from 'auto-bind'

import UaType from '~/types/UaType'
import GetUaData from '~/utils/getUaData'

/**
 * UA情報をhtml要素にデータ属性として追加
 */
class AddUaData {
  constructor() {
    autoBind(this)

    const clientData = GetUaData()

    this.addDataset(clientData)
  }

  addDataset(data: UaType): void {
    Object.entries(data).forEach(([key, value]) => {
      document.getElementsByTagName('html')[0].dataset[key.toLowerCase()] =
        typeof value === 'boolean' ? value.toString() : value
    })
  }
}

export default AddUaData
