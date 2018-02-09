<template>
  <div class="loading">
    <img width="24px" height="24px" src="./loading.gif" class="loading-img">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
    export default {
        props: {
          title: {
            type: String,
            default: '正在加载中...'
          }
        }
    }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .loading-img
      width: 24px
      height: 24px
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
