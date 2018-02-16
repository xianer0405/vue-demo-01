<template>
  <div class="singer">
    <listview :data="singers" @select="singerSelect"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingers} from 'api/singer'
  import {ERR_OK} from "common/js/config"
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import * as mutationsTypes from 'store/mutation-types'
  import Listview from 'base/listview/listview'

  const HOT_NAME = "热门"
  const HOT_LEN = 10

  export default {
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
      ...mapMutations({
        setSinger: mutationsTypes.SET_SINGER
      }),
      singerSelect(singer) {
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
