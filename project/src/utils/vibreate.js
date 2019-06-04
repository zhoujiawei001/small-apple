// 检测手机是否支持震动
export function vibration () {
  try {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate

    return !!navigator.vibrate;

  } catch (e) {
    return false
  }
}
