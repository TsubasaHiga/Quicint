import autoBind from 'auto-bind'

import UaType from '../types/UaType'
import GetUaData from '../utils/getUaData'

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
