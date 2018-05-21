//app.js
var utilObj=require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if(res.code) {
          wx.request({
            url: this.globalData.host + '/mini/login/' + res.code,
            data: {},
            success: res => {
              console.log(" login success ")
              this.globalData.minisign = res.data.minisign
              this.globalData.cookie = res.data.session_id
            
              console.log("---------------list music---------------------")
              var header = {
                Cookie: "JSESSIONID=" + this.globalData.cookie
              }
              console.log(this.globalData.cookie)
              wx.request({
                url: this.globalData.host + '/mini/list/music',
                data: {
                  minisign: this.globalData.minisign
                },
                header: header,
                method: 'GET',
                success: res => {
                  console.log(res)
                  var storageData = wx.getStorageSync('musicList');
                  if (!storageData) {
                    wx.clearStorageSync()
                    res.data.data.forEach(function (item) {
                      item.gmtCreate = utilObj.formatTime(new Date(item.gmtCreate))
                    })
                    wx.setStorageSync('musicList', res.data.data)
                  }
          
                },
                fail: function (res) {
                  console.log(res)
                }
              })
            },
            fail: function(res) {
              console.log(" login fail ")
              console.log(res)
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    host: "https://www.zerotop.top",
    cookie: '',
    minisign: '',
    nowMusic:{}
  }
})