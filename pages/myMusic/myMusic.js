// pages/myMusic/myMusic.js
var utilObj = require('../../utils/util.js')
const app = getApp()
import { DBPost } from '../../db/DBPost.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainBgImg: '',
    chooseFiles: '',
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost(),allMusic = dbPost.getAllMusic()
    console.log(dbPost.getAllMusic())
    if (dbPost.getAllMusic().length > 0) {
      allMusic.forEach(function (item) {
        item.gmtCreate = utilObj.formatTime(new Date(item.gmtCreate))
      })
      this.setData({
        mainBgImg: allMusic[0].imgUrl,
        musicList: allMusic,
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
    wx.navigateBack({
    })
  },
  listen(event) {
    let musicId = event.currentTarget.dataset.musicId
    wx.navigateTo({
      url: '../playMusic/playMusic?id=' + musicId + '&collect=' + false,
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
  swiperChange(e) {
    this.setData({
      current: e.detail.current,
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
        wx.redirectTo({
          url: '../mixMusic/mixMusic?musicImg=' + that.data.chooseFiles,
        })
      },
    })
  },
  removeMusic(event) {
    var currentMusicId = event.currentTarget.dataset.currentMusic.id, currentIdx = event.currentTarget.dataset.currentIndex
    wx.showModal({
      title: '删除歌曲',
      content: '确定删除该歌曲吗？',
      success: res => {
        if (res.confirm) {
          var header = {
            Cookie: "JSESSIONID=" + app.globalData.cookie
          }
          wx.request({
            url: app.globalData.host + '/mini/delete/music/' + currentMusicId,
            data: {
            },
            header: header,
            method: 'GET',
            success: res => {
              // dbPost.removeMusic(this.data.current)
              // wx.redirectTo({
              //   url: '../myMusic/myMusic',
              // })
              var dbPost = new DBPost()
              if (this.data.current === 0 && this.data.musicList.length === 1) {
                this.data.musicList.splice(this.data.current, 1)
                dbPost.removeMusic(this.data.current)
                this.setData({
                  current:-1
                })
                wx.showToast({
                  title: '没有歌曲了',
                  icon: 'none'
                })
              } else if (this.data.current === this.data.musicList.length - 1) {
                this.data.musicList.splice(this.data.current, 1)
                dbPost.removeMusic(this.data.current)
                this.data.current--
                this.setData({
                  musicList: this.data.musicList,
                  current: this.data.current,
                  mainBgImg: this.data.musicList[this.data.current].imgUrl

                })
              } else {
                this.data.musicList.splice(this.data.current, 1)
                dbPost.removeMusic(this.data.current)
                this.setData({
                  musicList: this.data.musicList,
                  current: this.data.current,
                  mainBgImg: this.data.musicList[this.data.current].imgUrl
                })
              }
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