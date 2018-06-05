// pages/playMusic/playMusic.js
const app = getApp()
var utilObj = require('../../utils/util.js')
import { DBPost } from '../../db/DBPost.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: true,
    progress: 0,
    isCollect: false,
    like: false,
    duration: 0,
    allWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.musicTitle) {
      app.globalData.nowMusic.musicTitle = options.musicTitle
    }
    if (this.data.duration === 0) {
      wx.showLoading({
        title: '正在加载歌曲',
      })
    }
    if (options.id) {
      var dbPost = new DBPost(options.id)
      var musicData = dbPost.getMusicById().data
      app.globalData.nowMusic = musicData
      this.setData({
        musicIdx: dbPost.getMusicById().index
      })
    }
    this.setData({
      music: app.globalData.nowMusic,
    })
    if (options.collect === 'true') {
      this.setData({
        isCollect: true
      })
    }
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
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
    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('unload')
    if (this.data.like) {
      var dbPost = new DBPost()
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
            musicTitle: app.globalData.nowMusic.musicTitle,
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

          dbPost.addMusic(app.globalData.nowMusic)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
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
    var progress = parseInt(e.detail.currentTime * 285 / e.detail.duration)
    this.setData({
      progress: progress,
      duration: e.detail.duration,
      musicDuration: utilObj.s_to_ms(e.detail.duration),
      musicCurrent: utilObj.s_to_ms(e.detail.currentTime),
    })
    wx.hideLoading()

  },
  seek(e) {
    console.log(e)

    this.audioCtx.seek(parseInt((e.detail.x - (wx.getSystemInfoSync().windowWidth * 0.12))) * this.data.duration / 285)
  },
  back() {
    wx.navigateBack({})
    // if (this.data.like) {
    //   wx.navigateBack({})
    // } else {
    //   wx.showModal({
    //     title: '不喜欢这首歌',
    //     content: '确定丢弃此歌曲吗？',
    //     success: res => {
    //       if (res.confirm) {
    //         wx.navigateBack({})
    //       }
    //     }
    //   })
    // }
  },
  rightIcon() {
    if (this.data.like) {
      wx.showToast({
        title: '无法丢弃',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (this.data.isCollect) {
      wx.showModal({
        title: '不喜欢这首歌',
        content: '确定丢弃此歌曲吗？',
        success: res => {
          if (res.confirm) {
            wx.navigateBack({})
          }
        }
      })
    } else {
      var dbPost = new DBPost()
      if (this.data.musicIdx < dbPost.getAllMusic().length - 1) {
        var musicId = dbPost.getAllMusic()[this.data.musicIdx + 1].id
        wx.redirectTo({
          url: '../playMusic/playMusic?id=' + musicId + '&collect' + false,
          success: res => {
            this.audioCtx.pause()
          }
        })
      } else {
        wx.showToast({
          title: '已经是最后一首了',
          icon: 'none',
          duration: 2000
        })
      }
    }

  },
  leftIcon() {
    if (this.data.isCollect) {
      if (!this.data.like) {
        this.setData({
          like: !this.data.like
        })
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          like: !this.data.like
        })
        wx.showToast({
          title: '取消收藏',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      if (this.data.musicIdx >= 1) {
        var dbPost = new DBPost(), musicId = dbPost.getAllMusic()[this.data.musicIdx - 1].id
        wx.redirectTo({
          url: '../playMusic/playMusic?id=' + musicId + '&collect' + false,
          success: res => {
            this.audioCtx.pause()
          }
        })
      } else {
        wx.showToast({
          title: '已经是第一首了',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  musicBtnMove(e) {
    this.audioCtx.seek(parseInt((e.touches[0].clientX - (wx.getSystemInfoSync().windowWidth * 0.12))) * this.data.duration / 285)
  },

})