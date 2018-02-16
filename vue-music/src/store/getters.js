export const singer = state => state.singer
export const playingState = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.sequenceList[state.currentIndex]
}
export const playMode = state => state.playMode
