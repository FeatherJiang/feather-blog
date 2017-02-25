<template>
  <div class="sidebar">
    <h1 class="title">{{title}}</h1>
    <div class="tags">
      <tag></tag>
    </div>
  </div>
</template>
<script>
  import tag from 'components/tag/tag'

  export default {
    props: {
      title: {
        type: String
      },
      tags: {
        type: Array
      }
    },
    components: {
      tag: tag
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .sidebar
    width 360px
    max-width 360px
    padding 10px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    .title
      line-height 40px
      font-size 20px
      font-weight 600
      text-align center
      color #4285f4
</style>
