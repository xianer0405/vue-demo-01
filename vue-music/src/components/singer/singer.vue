<template>
  <div>
    歌手页面
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingers} from 'api/singer'
  import {ERR_OK} from "common/js/config"
  import Singer from 'common/js/singer'
  const HOT_NAME = "热门"
  const HOT_LEN = 10

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingers()
    },
    methods: {
      _getSingers() {
        getSingers().then((res) => {
          if(res.code === ERR_OK) {
            this.singers = res.data.list
            console.log(this._nomalizeSingerList(this.singers))
          }
        })
      },
      _nomalizeSingerList(singers) {
        let m = new Map()
        m.set(HOT_NAME, {'title':HOT_NAME, 'items':[]})
        singers.forEach((item, index) => {
          if(index < HOT_LEN) {
            m.get(HOT_NAME).items.push(new Singer({id:item.Fsinger_mid,name:item.Fsinger_name}))
          } else {
            if(!m.has(item.Findex)) {
              m.set(item.Findex, {'title':item.Findex, 'items':[]})
            }
            m.get(item.Findex).items.push(new Singer({id:item.Fsinger_mid,name:item.Fsinger_name}))
          }
        })
        let hot = []
        let rest = []
        for(let [key, val] of m) {
          if(val.title.match(/[a-zA-Z]/)) {
            rest.push(val)
          } else if(val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        rest.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        console.log([...hot, ...rest])
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
