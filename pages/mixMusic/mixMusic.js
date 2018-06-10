// pages/test/test.js
var utilObj = require('../../utils/util.js')
const app = getApp()
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    isUpload: false,
    uploadPercent: 0,
    musicImg: '',
    text: '点击生成音乐',
    isModal: false,
    musicTitle: '未命名',
    canvasShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      musicImg: options.musicImg
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var progressCanvas = wx.createCanvasContext('progressCanvas')
    progressCanvas.setLineWidth(6);
    progressCanvas.setStrokeStyle('#eaeaea');
    progressCanvas.setLineCap('round');
    progressCanvas.beginPath();
    progressCanvas.arc(190, 190, 155, 0, 2 * Math.PI, false);
    progressCanvas.stroke();
    progressCanvas.draw();
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
    console.log('unload')
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
  drawArc(ctx, s, e) {
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 200, 200);
    ctx.draw();
    var x = 190, y = 190, radius = 155;
    ctx.setLineWidth(6);
    ctx.setStrokeStyle('#fff000');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(x, y, radius, s, e, false);
    ctx.stroke()
    ctx.draw()
  },
  uploadMusic() {
    let mainCanvas = wx.createCanvasContext('mainCanvas');
    let that = this
    const uploadTask = wx.uploadFile({
      url: 'https://www.zerotop.top/edu-web/common/upload/file',
      filePath: this.data.musicImg,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: res => {
        var header = {
          Cooike: "JSESSIONID=" + app.globalData.cookie
        }
        that.setData({
          isUpload: true,
          text: '生成结束'
        })
        wx.request({
          url: app.globalData.host + '/mini/generate/music',
          data: {
            imgUrl: JSON.parse(res.data).data[0]
          },
          header: header,
          method: 'POST',
          success: res => {
            app.globalData.nowMusic = res.data.data
            this.setData({
              isModal: true,
              canvasShow: false
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })

      },
      fail: () => {
        console.log('upload fail')
        wx.navigateBack({})
        this.setData({
          text: '生成失败'
        })
      }
    })
    uploadTask.onProgressUpdate((res) => {
      console.log(res)
      this.setData({
        uploadPercent: res.progress,
        text: '正在生成' + res.progress + '%'
      })
      this.drawArc(mainCanvas, 0, res.progress / 50 * Math.PI)
    })
  },
  back() {
    wx.navigateBack()
  },

  hideModal: function () {
    this.setData({
      isModal: false
    });
  },

  onCancel: function () {
    this.hideModal();
    wx.redirectTo({
      url: '../playMusic/playMusic?collect=' + true + '&musicTitle=' + this.data.musicTitle,
    })
  },

  onConfirm: function () {
    if (this.data.musicTitle) {
      this.hideModal();
      wx.redirectTo({
        url: '../playMusic/playMusic?collect=' + true + '&musicTitle=' + this.data.musicTitle,
      })
    }else{
      wx.showToast({
        title: '不能为空',
        icon:'none'
      })
    }
  },
  inputChange(event) {
    this.setData({
      musicTitle: event.detail.value
    })
  }

})