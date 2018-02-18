export const singer = state => state.singer
export const playingState = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  // 存在获取不到的情况，影响播放器第一次显示的动画效果，所以要返回一个空对象
  return state.playlist[state.currentIndex] || {}
}
export const playMode = state => state.playMode
export const disc = state => state.disc
export const rank = state => state.rank
