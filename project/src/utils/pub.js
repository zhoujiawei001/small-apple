export function parseHilinkData (resData) {
  try {
    return JSON.parse(resData)
  } catch (error) {
    let dataStr = resData.replace(/:"{/g, ':{')
    dataStr = dataStr.replace(/}",/g, '},')
    dataStr = dataStr.replace(/}"/g, '}')
    dataStr = dataStr.replace(/\\/g, '')
    return JSON.parse(dataStr)
  }
}

export function sendBodyToDev (body) {
  console.log('body', body)
  try {
    window.hilink.setDeviceInfo('0', JSON.stringify(body), 'app.setDeviceInfoCallback')
  } catch (e) {
    console.warn('无setDeviceInfo接口')
  }
}

export class RC {
  constructor (rid, name, index, src, beRmodel, rmodel, bid, tid, hname, hid, zip = '1', ui = 0, encode = 0) {
    this.rid = rid + ''
    this.name = name
    this.index = index
    this.src = src
    this.beRmodel = beRmodel
    this.rmodel = rmodel
    this.bid = bid
    this.tid = tid
    this.hname = hname // 自定义别名
    this.hid = hid // 自定义ID
    this.zip = zip
    this.ui = ui
    this.encode = encode
  }
}

export function assembleTS() {
  let now = new Date()
  let year = now.getFullYear() + ''
  let month = addO(now.getMonth() + 1)
  let date = addO(now.getDate())
  let hours = addO(now.getHours())
  let min = addO(now.getMinutes())
  let second = addO(now.getSeconds())
  return year + month + date + hours + min + second + 'Z'
}

export function addO(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return num + ''
  }
}

export function numArr(num) {
  let arr = []
  for (let i = 1; i<= num; i++) {
    arr.push(i)
  }
  return arr
}

/** 获取云端扩展数据 **/
export function getExtendToServe() {
  return new Promise(resolve => {
    try {
      window.getDeviceExtendDataCallback = res => {
        console.log('getExtendToServe', parseHilinkData(res))
        let data = parseHilinkData(res)
        if (JSON.stringify(data) === '{}') {
          resolve([])
        } else {
          let arr = data.data.list
          resolve(arr)
        }
      }
      window.hilink.getDeviceExtendData('deviceList', 'getDeviceExtendDataCallback')
    } catch (e) {
      console.warn('无接口')
    }
  })
}

/** 上报扩展数据到云端 **/
export function postExtendToServe(rc) {
  return new Promise(resolve => {
    getExtendToServe().then(list => {
      list.push(rc)
      let body = {
        type: 'deviceList',
        data: {
          list: list
        }
      }
      try {
        window.postDeviceExtendDataCallback = res => {
          console.log('postDeviceExtendDataCallback', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback')
      } catch (e) {
        console.warn('无上报接口')
      }
    })
  })
}

/** 编辑遥控设备名称根据hid **/
export function modifyDevName(hid, newName) {
  return new Promise(resolve => {
    getExtendToServe().then(data => {
      let newList = data.map(item => {
        if (item.hid === hid) {
          item.hname = newName
          return item
        } else {
          return item
        }
      })
      let body = {
        type: 'deviceList',
        data: {
          list: newList
        }
      }
      try {
        window.postDeviceExtendDataCallback = res => {
          console.log('postDeviceExtendDataCallback', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback')
      } catch (e) {
        console.warn('无上报接口')
      }
    })
  })
}

/** 删除设备遥控器 **/
export function delAddedDev(hid) {
  return new Promise(resolve => {
    getExtendToServe().then(data => {
      let newList = data.filter(item => item.hid !== hid)
      let body = {
        type: 'deviceList',
        data: {
          list: newList
        }
      }
      try {
        window.postDeviceExtendDataCallback = res => {
          console.log('postDeviceExtendDataCallback', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback')
      } catch (e) {
        console.warn('无上报接口')
      }
    })
  })
}
