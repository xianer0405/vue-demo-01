import {getLyric} from 'api/song'
import {ERR_OK} from './config'

export default class Song {
  constructor({id, name, mid, album, duration, singer, image, url}) {
    this.id = id
    this.name = name
    this.mid = mid
    this.album = album
    this.duration = duration
    this.singer = singer
    this.image = image
    this.url = url
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
          this.lyric = unescape(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

function unescape(lyric) {
  var t = document.createElement('div')
  t.innerHTML = lyric + ''
  return t.innerHTML
}

/* 创建Song实例的工厂方法，能够复用 */
export function createSong(musicData) {
  let song = new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: 'http://dl.stream.qqmusic.qq.com/C4000008Q3fX21Oh6k.m4a?guid=5672054500&vkey=0C14A82226FB05E3727E19C523129317C59298738CE217D7F96796BD730ABE99949926EED01ABF61F4B97828985627A60280E1FCF264A062&uin=900&fromtag=999',
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
