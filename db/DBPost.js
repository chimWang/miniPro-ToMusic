class DBPost {
  constructor(musicId) {
    this.strogeKeyName = 'musicList'
    this.musicId = musicId
  }
  //获得全部音乐
  getAllMusic() {
    let res = wx.getStorageSync(this.strogeKeyName)
    if (!res) {
      // res = require('../data/data.js').musicList
      this.execSetStorageSync(res)
    }
    return res
  }
  //本地缓存 保存/更新
  execSetStorageSync(data) {
    wx.clearStorageSync()
    wx.setStorageSync(this.strogeKeyName, data)
  }
  //根据id获取音乐
  getMusicById(){
    var musicData = this.getAllMusic()
    for (let i = 0, len = musicData.length;i<len;i++){
      if (Number(this.musicId) === Number(musicData[i].id)) {
        return {
          index:i,
          data: musicData[i]
        }
      }
    }
  }
  //修改歌曲名字
  editMusicName(name){
    var musicData = this.getAllMusic()
    console.log(name)
    musicData[this.getMusicById().index].musicTitle=name
    this.execSetStorageSync(musicData)
  }
  //添加歌曲到我的曲库
  addMusic(newMusic){
    var musicData = this.getAllMusic()
    musicData.unshift(newMusic)
    this.execSetStorageSync(musicData)
  }
  removeMusic(currentIdx){
    var musicData = this.getAllMusic()
    musicData.splice(currentIdx,1)
    this.execSetStorageSync(musicData)
  }
}

export{DBPost}