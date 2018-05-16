// pages/myMusic/myMusic.js
var touchDot = 0;
var nth = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainBgImg: '/images/index/welcome.jpg',
    chooseFiles:'',
    musicList: [
      {
        musicId:1,
        selected: false,
        name: 'Jungle Pink',
        date: '2018-5-10',
        bgImg: '/images/playMusic/background.jpg',
  
      },
      {
        musicId: 2,
        selected: true,
        name: '幻化成风',
        date: '2018-5-10',
        bgImg: '/images/index/welcome.jpg',
   
      },
      {
        musicId: 3,
        selected: false,
        name: 'see you again',
        date: '2018-5-10',
        bgImg: '/images/playMusic/background.jpg',

      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  back() {
    wx.navigateBack({

    })
  },
  listen(event) {
    let musicId=event.currentTarget.dataset.musicId
    let musicName = event.currentTarget.dataset.musicName
    let musicBg = event.currentTarget.dataset.musicBg
    wx.navigateTo({
      url: '../playMusic/playMusic?id=' + musicId + '&name=' + musicName + '&musicBg=' + musicBg + '&collect=' + false,
    })
  },
  // musicScroll(e){
  //   var itemWidth=e.detail.scrollWidth / this.data.musicList.length;
  //   var scrollLeft=e.detail.scrollLeft;
  //   var curIndex = Math.round(scrollLeft / itemWidth);
  //   for (var i = 0,len = this.data.musicList.length;i<len;i++){
  //     this.data.musicList[i].selected=false
  //   }
  //   this.data.musicList[curIndex].selected=true
  //   this.data.mainBgImg = this.data.musicList[curIndex].bgImg
  //   this.setData({
  //     musicList: this.data.musicList,
  //     mainBgImg: this.data.mainBgImg
  //   })
  // },
  touchStart(e) {
    touchDot = e.touches[0].pageX;
    console.log(touchDot + '----------')
  },
  touchMove(e) {
    let touchMove = e.touches[0].pageX;
    let diff = touchMove - touchDot
    console.log(diff+'..........')
    if (diff <= -60) {
      this.data.left -= 250
      this.setData({
        left:this.data.left
      })
    }
  },
  swiperChange(e){
    let nowIndex = e.detail.current
    this.data.musicList.forEach((item)=>{
      item.selected=false;
    })
    this.data.musicList[nowIndex].selected=true
    this.setData({
      musicList: this.data.musicList,
      mainBgImg: this.data.musicList[nowIndex].bgImg
    })
  },
  chooseImage(event) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          chooseFiles: res.tempFilePaths
        })
        console.log(that.data.chooseFiles)
        wx.navigateTo({
          url: '../mixMusic/mixMusic?musicImg=' + that.data.chooseFiles,
        })
      },
    })
  }

})