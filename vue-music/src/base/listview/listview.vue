<template>
  <scroll @scroll="scrollEvtHandler"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
            :class="{'current':currentAnchorIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {dataAttr, addClass} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: 1,
        currentAnchorIndex: 0,
        diff: -1
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.listGroupItemHeightArr = []
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        this.touch.y1 = e.touches[0].pageY
        let index = dataAttr(e.target, 'index')
        this.touch.anchorIndex = parseInt(index)

        this._scrollTo(index)
      },
      onShortcutTouchMove(e) {
        this.touch.y2 = e.touches[0].pageY
        let anchorIndex = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        this._scrollTo(this.touch.anchorIndex + anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scrollEvtHandler(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listGroupItemHeightArr.length - 2) {
          index = this.listGroupItemHeightArr.length - 2
        }
        this.scrollY = -this.listGroupItemHeightArr[index]
        let el = this.$refs.listGroup[index]
        this.$refs.listview.scrollToElement(el, 0)
      },
      _calculateHeight() {//计算每个list-group元素的相对高度
        this.listGroupItemHeightArr = []
        let listGroup = this.$refs.listGroup
        let height = 0
        this.listGroupItemHeightArr.push(height)
        for (let groupEl of listGroup) {
          height += groupEl.clientHeight
          this.listGroupItemHeightArr.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        // 当滚动到顶部
        if (newY > 0) {
          this.currentAnchorIndex = 0
          return
        }

        //当滚动到中间部分
        const listHeightArr = this.listGroupItemHeightArr
        let positiveY = -newY
        for (let i = 0; i < listHeightArr.length - 1; i++) {
          let firstH = listHeightArr[i]
          let secondH = listHeightArr[i + 1]
          if (positiveY >= firstH && positiveY < secondH) {
            this.currentAnchorIndex = i
            this.diff = secondH + newY
            return
          }
        }

        //当滚动到底部
        if (positiveY > listHeightArr[listHeightArr.length - 1]) {
          this.currentAnchorIndex = listHeightArr.length - 2
        }
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - 30 : 0
        if (this.fixedTop == fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentAnchorIndex] ? this.data[this.currentAnchorIndex].title : ''
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
