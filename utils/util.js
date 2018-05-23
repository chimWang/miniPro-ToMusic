const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
  //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const s_to_ms = s => {
  var m;
  m = Math.floor(s / 60);
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s = parseInt(s % 60);
  //将变量转换为字符串
  m += '';
  s += '';
  //如果只有一位数，前面增加一个0
  m = (m.length == 1) ? '0' + m : m;
  s = (s.length == 1) ? '0' + s : s;
  return m + ':' + s;
}
module.exports = {
  formatTime: formatTime,
  s_to_ms: s_to_ms
}
