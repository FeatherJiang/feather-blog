<template>
  <div class="article">
    <div class="container">
      <div class="main-wrapper">
        <div class="main">
          <markdown :text="text"></markdown>
          <div class="footer">
            <span class="browse"><i class="fa fa-eye"></i>123</span>
            <span class="comment"><i class="fa fa-comments"></i>123</span>
            <span class="like"><i class="fa fa-star"></i>213</span>
            <span class="time"><i class="fa fa-calendar"></i>2016-5-3</span>
          </div>
          <div class="btn-wrapper">
            <span class="back" @click="back"><i class="fa fa-chevron-left"></i></span>
            <span class="star"><i class="fa" :class="{'fa-star': isStar, 'fa-star-o': !isStar}"></i></span>
          </div>
        </div>
      </div>
      <div class="sidebar-wrapper" :class="{'fixed': fixed}">
        <sidebar v-for="title in sidebars" :title="title"></sidebar>
      </div>
    </div>
    <div class="backtotop-wrapper">
      <backtotop></backtotop>
    </div>
  </div>
</template>
<script>
  import sidebar from 'components/sidebar/sidebar'
  import backtotop from 'components/backtotop/backtotop'
  import markdown from 'components/markdown/markdown'

  export default {
    props: {
      isStar: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false,
        text: '- sdfsfdd\n- sdfsdf\n'
      }
    },
    methods: {
      articleScroll () {
        if (window.scrollY >= 56) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      back () {
        window.history.back()
      }
    },
    created () {
      window.addEventListener('scroll', this.articleScroll)
    },
    components: {
      sidebar: sidebar,
      backtotop: backtotop,
      markdown: markdown
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .article
    width 100%
    margin-top 56px
    .container
      width 1200px
      max-width 1200px
      margin  0 auto
      font-size 0
      .main-wrapper
        display inline-block
        width 800px
        max-width 800px
        .main
          width 100%
          margin 10px 0
          background #fff
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .footer
            text-align right
            span
              display inline-block
              margin-right 10px
              font-size 14px
              color #7e8c8d
              cursor pointer
              &:last-child
                margin-right 20px
              &:hover
                color #4285f4
              i
                display inline-block
                margin-right 4px
      .btn-wrapper
        padding  10px 20px
        text-align left
        .back
          display inline-block
          width 50px
          height 30px
          margin-right 20px
          text-align center
          background #f7f7f7
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          transition all 0.2s ease
          &:hover
            color #fff
            background #4285f4
          i
            margin-left -4px
            line-height 32px
            font-size 20px
        .star
          display inline-block
          width 50px
          height 30px
          vertical-align top
          text-align center
          background #f7f7f7
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          transition all 0.5s ease
          &:hover
            color #fff
            background #4285f4
          i
            line-height 30px
            font-size 20px
      .sidebar-wrapper
        display inline-block
        width 380px
        max-width 380px
        margin-left 20px
        vertical-align top
        &.fixed
          position fixed
          top 56px
        .sidebar
          margin 10px 0
    .backtotop-wrapper
      position fixed
      left 50%
      bottom 50px
      margin-left 220px
</style>
