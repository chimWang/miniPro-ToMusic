// pages/playMusic/playMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
    progress:0,
    musicId:'',
    musicName:'',
    musicBg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      musicId: options.id,
      musicName: options.name,
      musicBg: options.musicBg
    })
    this.audioCtx=wx.createAudioContext('myAudio')
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  onMusicTap(){
    if (this.data.isPlayingMusic){
      this.audioCtx.pause()
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic
      })
    }else{
      this.audioCtx.play()
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic
      })
    }
  },
  musicStart(e){
    var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
    this.setData({
      progress: progress
    })
  },
  back() {
    wx.navigateBack({

    })
  },
})