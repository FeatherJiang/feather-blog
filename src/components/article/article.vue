<template>
  <div class="article">
    <div class="img-wrapper">
      <img src="../../assets/imgs/deep_space.png" width="230" height="130">
    </div>
    <div class="overview">
      <h1 class="title">this is a test</h1>
      <div class="tag-wrapper">
        <tag></tag>
      </div>
      <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut ducimus, ex facilis, fuga laborum libero modi necessitatibus nesciunt nisi porro quasi, quod reiciendis sint veritatis vero voluptatibus. Distinctio, ex.</div>
      <div class="meta">
        <span class="time">2016-5-3</span>
        <span class="browse">123</span>
        <span class="comment">123</span>
        <span class="like">213</span>
      </div>
    </div>
  </div>
</template>
<script>
  import tag from 'components/tag/tag'

  export default {
    props: {
      article: {
        type: Object
      }
    },
    components: {
      tag: tag
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .article
    width 800px
    max-width 800px
    height 150px
    font-size 0
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    cursor pointer
    .img-wrapper
      display inline-block
      width 230px
      height 130px
      margin 10px
      border-radius 2px
      overflow hidden
      img
        border-radius 2px
        transition all 0.3s linear
        &:hover
          transform scale(1.1)
    .overview
      display inline-block
      width 540px
      height 130px
      margin 10px 10px 10px 0
      vertical-align top
      .title
        font-size 20px
        color #4285f4
      .tag-wrapper
        width 100%
        height 20px
        padding 5px 0
      .text
        height 65px
        line-height 18px
        font-size 14px
        color #7e8c8d
        overflow hidden
      .meta
        font-size 14px
        color #7e8c8d
        text-align right
</style>
