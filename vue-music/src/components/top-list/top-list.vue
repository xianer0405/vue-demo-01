<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getTopList} from "api/rank"
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        name: "top-list",
        songs: [],
        rank: true
      }
    },
    computed: {
      ...mapGetters({
        rankInfo: 'rank'
      }),
      title() {
        console.log(this.rankInfo)
        return this.rankInfo.topTitle
      },
      bgImage() {
        return this.rankInfo.picUrl
      }
    },
    methods: {
      _getTopList() {
        if (!this.rankInfo.id) {
          this.$router.push('/rank')
          return
        }
        getTopList(this.rankInfo.id).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this._normalizeSingerList(res.songlist)
          }
        }).catch((err) => {
          console.log(`get toplist fail, err is ${err}`)
        })
      },
      _normalizeSingerList(list) {
        for (let item of list) {
          let {data} = item
          this.songs.push(createSong(data))
        }
      }
    },
    created() {
      setTimeout(() => {
        this._getTopList()
      }, 300)
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
