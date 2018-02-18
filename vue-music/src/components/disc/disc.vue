<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getDiscDetail} from "api/recommend"
  import {ERR_OK} from 'common/js/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    data() {
      return {
        name: "singer-detail",
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      }
    },
    methods: {
      _getDiscDetail() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getDiscDetail(this.disc.dissid).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this._normalizeSongList(res.cdlist[0].songlist)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      _normalizeSongList(list) {
        for (let item of list) {
          this.songs.push(createSong(item))
        }
      }
    },
    created() {
      setTimeout(() => {
        this._getDiscDetail()
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
