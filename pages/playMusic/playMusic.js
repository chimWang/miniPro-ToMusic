// pages/playMusic/playMusic.js
const app = getApp()
var utilObj = require('../../utils/util.js')
import { DBPost } from '../../db/DBPost.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    progress: 0,
    isCollect: false,
    like: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      var dbPost = new DBPost(options.id)
      var musicData = dbPost.getMusicById().data
      app.globalData.nowMusic = musicData
    }
    this.setData({
      music: app.globalData.nowMusic
    })
    if (options.collect === 'true') {
      this.setData({
        isCollect: true
      })
    }
    this.audioCtx = wx.createAudioContext('myAudio')
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
  onMusicTap() {
    if (this.data.isPlayingMusic) {
      this.audioCtx.pause()
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic
      })
    } else {
      this.audioCtx.play()
      this.setData({
        isPlayingMusic: !this.data.isPlayingMusic
      })
    }
  },
  musicStart(e) {
    var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
    this.setData({
      progress: progress
    })
  },
  back() {
    if (this.data.isCollect) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.navigateBack({

      })
    }
  },
  remove() {
    wx.showModal({
      title: '不喜欢这首歌',
      content: '确定丢弃此歌曲吗？',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
  },
  saveMusic() {
    console.log("---------------add music----------------------")
    var header = {
      Cookie: "JSESSIONID=" + app.globalData.cookie
    }
    wx.request({
      url: app.globalData.host + '/mini/add/music',
      data: {
        minisign: app.globalData.minisign,
        music: {
          musicUrl: this.data.music.musicUrl,
          musicTitle: this.data.music.musicTitle,
          imgUrl: this.data.music.imgUrl
        }
      },
      header: header,
      method: 'POST',
      success: res => {
        console.log(res)
        this.setData({
          like: true
        })
        wx.request({
          url: app.globalData.host + '/mini/list/music',
          data: {
            minisign: app.globalData.minisign
          },
          header: header,
          method: 'GET',
          success: res => {
            console.log(res)
            var storageData = wx.getStorageSync('musicList');
            wx.clearStorageSync()
            res.data.data.forEach(function (item) {
              item.gmtCreate = utilObj.formatTime(new Date(item.gmtCreate))
            })
            wx.setStorageSync('musicList', res.data.data)


          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    console.log("---------------end----------------------")
  }
})