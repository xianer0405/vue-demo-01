<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="singerSelect" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingers} from 'api/singer'
  import {ERR_OK} from "api/config"
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import * as mutationsTypes from 'store/mutation-types'
  import Listview from 'base/listview/listview'
  import {playlistMixin} from 'common/js/mixin'
  import VConsole2 from 'vconsole'

  const HOT_NAME = "热门"
  const HOT_LEN = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      setTimeout(() => {
        this._getSingers()
      }, 300)
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapMutations({
        setSinger: mutationsTypes.SET_SINGER
      }),
      singerSelect(singer) {
        // console.log(singer)
        // console.info('console.info')
        // console.debug('console.debug')
        // console.warn('console.warn')
        // console.error('console.error')
        this.setSinger(singer)
        this.$router.push(`/singer/${singer.id}`)
      },
      _getSingers() {
        getSingers().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._nomalizeSingerList(res.data.list)
          }
        })
      },
      _nomalizeSingerList(singers) {
        let m = new Map()
        m.set(HOT_NAME, {'title': HOT_NAME, 'items': []})
        singers.forEach((item, index) => {
          if (index < HOT_LEN) {
            m.get(HOT_NAME).items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
          } else {
            if (!m.has(item.Findex)) {
              m.set(item.Findex, {'title': item.Findex, 'items': []})
            }
            m.get(item.Findex).items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
          }
        })

        /*转换singer数据的数据接口*/
        let hot = []
        let rest = []
        for (let [key, val] of m) {
          if (val.title.match(/[a-zA-Z]/)) {
            rest.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        /*根据Findex生序排序*/
        rest.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return [...hot, ...rest]
      }
    },
    components: {
      Listview,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
