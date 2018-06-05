// musicRank/musicRank.js
const app = getApp()
const audioCtx = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    rankList: [],
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header = {
      Cookie: "JSESSIONID=" + app.globalData.cookie
    }
    wx.request({
      url: app.globalData.host + '/mini/list/music',
      data: {
        minisign: app.globalData.minisign
      },
      header: header,
      method: 'GET',
      success: res => {
        console.log(res.data.data)
        this.setData({
          rankList: res.data.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    audioCtx.stop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    audioCtx.stop()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  back() {
    wx.navigateBack({
      success:res=>{
        audioCtx.stop()
      }
    })
  },
  playMusic(event) {
    var idx = event.currentTarget.dataset.musicIdx
    app.globalData.nowMusic = this.data.rankList[idx]
    wx.navigateTo({
      url: '../playMusic/playMusic?collect=' + true,
    })
  },
  play(event) {
    var idx = event.currentTarget.dataset.musicIdx
    audioCtx.src = this.data.rankList[idx].musicUrl
    if (this.data.isPlayingMusic) {
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic,
        currentIdx: -1
      })
      audioCtx.stop()
    } else {
      audioCtx.play()
      this.setData({
        currentIdx: idx,
        isPlayingMusic: true
      })
    }

  },
})