// pages/myMusic/myMusic.js
var utilObj = require('../../utils/util.js')
const app = getApp()
import {DBPost} from '../../db/DBPost.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainBgImg: '',
    chooseFiles:'',
    nowIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost()
    console.log(dbPost.getAllMusic())
    if (dbPost.getAllMusic().length > 0) {
      var allMusic = dbPost.getAllMusic()
      allMusic.forEach(function (item) {
        item.gmtCreate = utilObj.formatTime(new Date(item.gmtCreate))
      })
      this.setData({
        mainBgImg: dbPost.getAllMusic()[0].imgUrl,
        musicList: allMusic
      })
    } 
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
    wx.navigateTo({
      url: '../index/index',
    })
  },
  listen(event) {
    let musicId=event.currentTarget.dataset.musicId
    wx.navigateTo({
      url: '../playMusic/playMusic?id=' + musicId +'&collect'+false,
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
  swiperChange(e){
    this.setData({
      nowIndex: e.detail.current,
      musicList: this.data.musicList,
      mainBgImg: this.data.musicList[e.detail.current].imgUrl
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
  },
  removeMusic(event) {
    console.log(event)
    
    var currentMusicId = event.currentTarget.dataset.currentMusic.id, currentIdx = event.currentTarget.dataset.currentIndex
    wx.showModal({
      title: '删除歌曲',
      content: '确定删除该歌曲吗？',
      success: res=> {
        if (res.confirm) {
          var header = {
            Cookie: "JSESSIONID=" + app.globalData.cookie
          }
          wx.request({
            url: app.globalData.host + '/mini/delete/music/' + currentMusicId ,
            data: {
            },
            header: header,
            method: 'GET',
            success: res => {
              // console.log(res)
              var dbPost = new DBPost()
              dbPost.removeMusic(currentIdx)
              wx.navigateTo({
                url: '../myMusic/myMusic',
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
  }

})