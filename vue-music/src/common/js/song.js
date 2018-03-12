import {getLyric, getVKey} from 'api/song'
import {Base64} from 'js-base64'
import {getUid} from './uid'
import {ERR_OK} from 'api/config'

let urlMap = {}

export default class Song {
  constructor({id, name, mid, album, duration, singer, image, url}) {
    this.id = id
    this.name = name
    this.mid = mid
    this.album = album
    this.duration = duration
    this.singer = singer
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.url = url
    // 确保一首歌曲的 id 只对应一个 url
    if (urlMap[this.id]) {
      this.url = urlMap[this.id]
    } else {
      this._genUrl()
    }
  }

  // 为了统一异步与同步两种不同的结果，所以将其都封装为Promise
  getLyric() {
    if (this.lyric) {
      // 将结果直接封装为Promise
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  _genUrl() {
    if (this.url) {
      return
    }
    getVKey(this.mid, this.filename).then((res) => {
      if (res.code === ERR_OK) {
        const vkey = res.data.items[0].vkey
        this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
        urlMap[this.id] = this.url
      }
    })
  }
}

// function unescape(lyric) {
//   var t = document.createElement('div')
//   t.innerHTML = lyric + ''
//   return t.innerHTML
// }

/* 创建Song实例的工厂方法，能够复用 */
export function createSong(musicData) {
  let song = new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    singer: joinSinger(musicData.singer)
  })
  return song
}

export function joinSinger(singer) {
  if (!singer) {
    return ''
  }
  let arr = singer.map((item) => {
    return item.name
  })
  return arr.join('/')
}
