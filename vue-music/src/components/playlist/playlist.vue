<template>
  <transition class="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" @click="changeMode" :class="iconMode"></i>
            <span class="text">{{modeText}}</span>
            <span @click="showConfirm" class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll ref="listContent" :data="sequenceList" class="list-content" :refreshDelay="refreshDelay">
          <transition-group name="list" tag="ul">
            <li :key="item.id" ref="listItem" @click="selectItem(item, index)" class="item" v-for="(item, index) in sequenceList">
              <i class="current" :class="getCurrIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteSong(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="showAddSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="clearPlaylist" text="确定清空播放列表?"></confirm>
      <add-song ref="addSong" @hide="scrollToCurrentSong"></add-song>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {playerMixin, favoriteMixin} from 'common/js/mixin'
  import {playMode} from 'common/js/config'
  import Confirm from 'base/confirm/confirm'
  import AddSong from 'components/add-song/add-song'

  export default {
    mixins: [playerMixin, favoriteMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay: 100
      }
    },
    computed: {
      modeText() {
        return playMode.SEQUENCE === this.playMode ? '顺序播放' :
          playMode.RANDOM === this.playMode ? '随机播放' : '循环播放'
      },
      ...mapGetters([
        'currentIndex',
        'currentSong'
      ])

    },
    methods: {
      showAddSong() {
        this.$refs.addSong.show()
      },
      clearPlaylist() {
        this.clearSong()
        this.hide()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      deleteItem(item) {
        this.deleteSong(item)
      },
      selectItem(currentSong, index) {
        let currIndex = index
        if (playMode.RANDOM === this.playMode) {
          currIndex = this.playlist.findIndex((item) => {
            return item.id === currentSong.id
          })
        }
        this.setCurrentIndex(currIndex)
        this.setPlayingState(true)
        // 监听currentSonb变化来处理这件事
        // this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      },
      getCurrIcon(item) {
        if (item.id === this.currentSong.id) {
          return 'icon-play'
        } else {
          return ''
        }
      },
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollToCurrentSong()
        }, 20)
      },
      // 有多余一个地方调用且超过两行代码就要封装成函数
      scrollToCurrentSong() {
        let currIndex = this.sequenceList.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        if (currIndex == -1) {
          return
        }
        this.$refs.listContent.scrollToElement(this.$refs.listItem[currIndex], 200)
      },
      hide() {
        this.showFlag = false
      },
      ...mapActions([
        'deleteSong',
        'clearSong'
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong) {
          return
        }
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this.scrollToCurrentSong()
      }
    },
    components: {
      Scroll,
      Confirm,
      AddSong
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 10px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
