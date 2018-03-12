import {mapGetters, mapMutations, mapActions} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'
import {playMode} from 'common/js/config'
import {shuffle2} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist(list) {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
      return this.playMode === playMode.SEQUENCE ? 'icon-sequence' : this.playMode === playMode.LOOP ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'playlist',
      'sequenceList',
      'playingState',
      'playMode'
    ])
  },
  methods: {
    changeMode() {
      let mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
      // 如果是随机播放则shuffle seqlist->playlist
      // 如果是顺序播放则将playlist改为sequenceList
      // 保留当前index,提交index和playlist
      let list = null
      if (mode === playMode.RANDOM) {
        list = shuffle2(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setFullScreen: mutationTypes.SET_FULL_SCREEN,
      setPlayingState: mutationTypes.SET_PLAYING_STATE,
      setPlayMode: mutationTypes.SET_PLAY_MODE,
      setPlaylist: mutationTypes.SET_PLAYLIST,
      setCurrentIndex: mutationTypes.SET_CURRENT_INDEX
    })
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ]),
    delSearchItem(searchItem) {
      this.deleteSearchHistory(searchItem)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    }
  }
}

export const favoriteMixin = {
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods: {
    getFavoriteIcon(song) {
      let icon = this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
      return icon
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song) {
      let sIndex = this.favoriteList.findIndex((item) => {
        return item.mid === song.mid
      })
      return sIndex >= 0
    },
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}
