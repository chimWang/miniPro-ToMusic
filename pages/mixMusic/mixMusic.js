// pages/test/test.js
const app = getApp()

Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    isUpload:false,
    uploadPercent:0,
    musicImg:'',
    text:'点击生成音乐'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      musicImg:options.musicImg
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
      success: function (res) {
        var data = res.data
        //do something
        var header = {
          Cooike: "JSESSIONID=" + app.globalData.cookie
        }
        that.setData({
          isUpload: true,
          text:'生成结束'
        })
        wx.request({
          url: app.globalData.host + '/mini/generate/music',
          data: {
          },
          header: header,
          method: 'GET',
          success: function (res) {
            console.log(res)
            app.globalData.nowMusic = res.data.data
            wx.navigateTo({
              url: '../playMusic/playMusic?collect='+true,
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
       
      },
      fail:function(){
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
        text:'正在生成'+res.progress+'%'
      })
      this.drawArc(mainCanvas, 0, res.progress / 50 *Math.PI)
    })
  },
  back() {
    wx.navigateBack({

    })
  },

})