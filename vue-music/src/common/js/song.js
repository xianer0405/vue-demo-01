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
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=99C03D0F52606BA2E1754EAECFA0D7F72654564145007CE30579EA94D976DFD0BC333F4F8B3D4161520B3E6CC346A6AF7B2CB976698DE74C&guid=5672054500&uin=0&fromtag=66`,
    url: `http://dl.stream.qqmusic.qq.com/C400002B2EAA3brD5b.m4a?vkey=99C03D0F52606BA2E1754EAECFA0D7F72654564145007CE30579EA94D976DFD0BC333F4F8B3D4161520B3E6CC346A6AF7B2CB976698DE74C&guid=5672054500&uin=0&fromtag=66`,
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
