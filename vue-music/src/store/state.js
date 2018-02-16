import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 是否全屏
  playlist: [], // 播放列表
  sequenceList: [],
  currentIndex: -1,
  playMode: playMode.SEQUENCE
}

export default state
