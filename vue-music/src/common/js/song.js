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
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`,
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
