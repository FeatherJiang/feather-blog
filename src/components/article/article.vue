<template>
  <div class="article">
    <div class="container">
      <div class="main-wrapper">
        <div class="main"></div>
      </div>
      <div class="sidebar-wrapper">
        <sidebar v-for="title in sidebars" :title="title"></sidebar>
      </div>
    </div>
  </div>
</template>
<script>
  import sidebar from 'components/sidebar/sidebar'

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG']
      }
    },
    components: {
      sidebar: sidebar
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
          height 100px
          margin 10px 0
          background #fff
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26')
      .sidebar-wrapper
        display inline-block
        width 380px
        max-width 380px
        margin-left 20px
        vertical-align top
        .sidebar
          margin 10px 0
</style>
