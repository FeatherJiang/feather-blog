<template>
  <div class="article">
    <div class="container">
      <div class="main-wrapper">
        <div class="main">
          <markdown :text="text"></markdown>
          <div class="footer">
            <span class="back"><i class="fa fa-chevron-left"></i></span>
            <span class="browse"><i class="fa fa-eye"></i>123</span>
            <span class="comment"><i class="fa fa-comments"></i>123</span>
            <span class="like"><i class="fa fa-star"></i>213</span>
            <span class="time"><i class="fa fa-calendar"></i>2016-5-3</span>
          </div>
        </div>
      </div>
      <div class="sidebar-wrapper" :class="{'fixed': fixed}">
        <sidebar v-for="title in sidebars" :title="title"></sidebar>
      </div>
    </div>
  </div>
</template>
<script>
  import sidebar from 'components/sidebar/sidebar'
  import markdown from 'components/markdown/markdown'

  export default {
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
      }
    },
    created () {
      window.addEventListener('scroll', this.articleScroll)
    },
    components: {
      sidebar: sidebar,
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
            span
              font-size 14px
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
</style>
