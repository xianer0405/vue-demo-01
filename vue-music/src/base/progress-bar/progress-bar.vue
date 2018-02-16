<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    created() {
      //用于在touch事件件共享数据
      this.touch = {}
    },
    methods: {
      progressClick(e) {
        //let offsetLeft = this.$refs.progressBar.offsetLeft
        //let offset = e.clientX - offsetLeft
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._setOffset(offsetWidth)
        this._triggerProgressUpdate()
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)

      },
      progressTouchStart(e) {
        this.touch.initialized = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if(!this.touch.initialized) {//实际解决什么问题？？
          return
        }
        this.touch.endX = e.touches[0].pageX
        let deltaX = this.touch.endX - this.touch.startX // 拖动的距离
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let offset = Math.min(barWidth, Math.max(0, this.touch.left + deltaX))
        this._setOffset(offset)
      },
      progressTouchEnd() {
        this.touch.initialized = false
        this._triggerProgressUpdate()
      },
      _triggerProgressUpdate() {
        let progressWidth = this.$refs.progress.clientWidth
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let percent = progressWidth / barWidth
        this.$emit('progressUpdate', percent)
      },
      _setOffset(offset) {
        this.$refs.progress.style.width = `${offset}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offset}px, 0, 0)`
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent > 0 && !this.touch.initialized) {
          let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          let offset = newPercent * barWidth
          this._setOffset(offset)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
