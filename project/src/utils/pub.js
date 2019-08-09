import { vibration } from '../utils/vibreate'
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
  if (vibration()) {
    navigator.vibrate(100)
  }
  try {
    window.hilink.setDeviceInfo('0', JSON.stringify(body), 'app.setDeviceInfoCallback')
  } catch (e) {
    console.warn('无setDeviceInfo接口')
  }
}
export function sendBodyToDev2 (body, callback) {
  console.log('body', body)
  if (vibration()) {
    navigator.vibrate(100)
  }
  return new Promise(resolve => {
    try {
      window[callback] = res => {
        console.log(callback, parseHilinkData(res))
        resolve(parseHilinkData(res))
      }
      window.hilink.setDeviceInfo('0', JSON.stringify(body), callback)
    } catch (e) {
      console.warn('无setDeviceInfo接口')
    }
  })
}

export class RC {
  constructor (rid, name, index, src, beRmodel, rmodel, bid, tid, hname, hid, zip2, isSwitch = 'on', pageType = 'controlPage', zip = '1', ui = 0, encode = 0) {
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
    this.zip2 = zip2
    this.ui = ui
    this.encode = encode
    this.isSwitch = isSwitch
    this.pageType = pageType
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
        console.log('getExtendToServe_result', parseHilinkData(res))
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
      console.log('postDeviceExtendData_body', body)
      window.postDeviceExtendDataCallback4 = res => {
        console.log('postDeviceExtendData_result', parseHilinkData(res))
        resolve(parseHilinkData(res))
      }
      window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback4')
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
        console.log('postDeviceExtendData_body', body)
        window.postDeviceExtendDataCallback3= res => {
          console.log('postDeviceExtendData_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback3')
      } catch (e) {
        console.warn('无上报接口')
      }
    })
  })
}

/** 修改遥控设备的开关状态根据hid **/
export function modifyDevSwitchByHid (hid, isSwitch) {
  return new Promise(resolve => {
    getExtendToServe().then(data => {
      let newList = data.map(item => {
        if (item.hid === hid) {
          item.isSwitch = isSwitch
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
        console.log('postDeviceExtentData_body', body)
        window.postDeviceExtendDataCallback2 = res => {
          console.log('postDeviceExtentData_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback2')
      } catch (e) {
        console.warn('无上报接口')
      }
    })
  })
}

/** 删除设备遥控器从云端 **/
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
      console.log('postDeviceExtendData_body', body)
      window.postDeviceExtendDataCallback = res => {
        console.log('postDeviceExtendData_result', body)
        resolve(parseHilinkData(res))
      }
      window.hilink.postDeviceExtendData(JSON.stringify(body), 'postDeviceExtendDataCallback')
    })
  })
}

/** 删除已注册的虚拟遥控器 **/
export function removeRegisteredVirtualDevYk(devId) {
  return new Promise(resolve => {
    console.log('removeRegistered_body', devId)
    window.delInfraredHubDeviceCallback = res => {
      console.log('removeRegistered_result', JSON.parse(res))
      resolve(JSON.parse(res))
    }
    window.hilink.deleteInfraredHubDevice(devId, 'delInfraredHubDeviceCallback')
  })
}

/** 监听手机虚拟按键返回事件 **/
export function watchVirtualKey (bool) {
  return new Promise(resolve => {
    window.hilink.overrideBackPressed(bool, 'matchVirtualKeyCallback')
    window.matchVirtualKeyCallback = res => {
      console.log(res)
      resolve(bool)
    }
  })
}

/** 匹配超时下发指令 **/
export function matchTimeoutSendOrder () {
  let body = {
    loadRes: {
      isFinish: 2 // 2-重新匹配
    }
  }
  sendBodyToDev(body)
}

/** 判断是Android还是iOS手机 **/
export function isAndroid() {
  let u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}
