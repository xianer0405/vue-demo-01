import {playMode} from 'common/js/config'
import {loadSearches, loadPlay} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 是否全屏
  playlist: [], // 播放列表
  sequenceList: [],
  currentIndex: -1,
  playMode: playMode.SEQUENCE,
  disc: {},
  rank: {},
  searchHistory: loadSearches(),
  playHistory: loadPlay()
}

export default state
