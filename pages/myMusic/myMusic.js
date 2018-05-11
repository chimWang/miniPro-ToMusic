// pages/myMusic/myMusic.js
var touchDot = 0;
var nth = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    left: 0,
    mainBgImg: '/images/index/welcome.jpg',
    musicList: [
      {
        selected: false,
        name: 'Jungle Pink',
        date: '2018-5-10',
        bgImg: '/images/playMusic/background.jpg'
      },
      {
        selected: true,
        name: '55555',
        date: '2018-5-10',
        bgImg: '/images/index/welcome.jpg'
      },
      {
        selected: false,
        name: '2222',
        date: '2018-5-10',
        bgImg: '/images/playMusic/background.jpg'
      },
      {
        selected: false,
        name: '2222',
        date: '2018-5-10',
        bgImg: '/images/playMusic/background.jpg'
      }
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
  listen() {
    wx.navigateTo({
      url: '../playMusic/playMusic',
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
  }

})