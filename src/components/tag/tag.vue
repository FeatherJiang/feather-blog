<template>
  <span class="tag" @click.stop.prevent="queryTag">
    {{tag}}
  </span>
</template>
<script>
  const OK = 1

  export default {
    props: {
      tag: {
        type: String,
        default: 'other'
      }
    },
    methods: {
      // 不同标签跳转不同路由
      queryTag () {
        let Vue = this
        this.$http.post('/api/getTagType', {tag: this.tag})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              if (res.data === 0) {
                Vue.$router.push({path: '/technology', query: {tag: Vue.tag}})
              } else if (res.data === 1) {
                Vue.$router.push({path: '/life', query: {tag: Vue.tag}})
              } else if (res.data === 2) {
                Vue.$router.push({path: '/technology', query: {tag: Vue.tag}})
              }
            }
          })
          .catch(function (err) {
            console.log(err.toString())
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .tag
    display inline-block
    height 20px
    padding 0 5px
    line-height 20px
    font-size 14px
    color #fff
    background rgba(66, 133, 244, 0.8)
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    cursor pointer
    transition all 0.2s
    &:hover
      background rgba(66, 133, 244, 1)
</style>
