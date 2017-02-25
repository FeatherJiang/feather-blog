<template>
  <div class="home">
    <div class="banner-wrapper">
      <banner></banner>
    </div>
    <div class="container">
      <div class="main-wrapper">
        <transition-group tag="div" name="init">
          <v-article v-for="n in 10" :key="n"></v-article>
        </transition-group>
      </div>
      <div class="sidebar-wrapper">
        <sidebar v-for="title in sidebars" :title="title"></sidebar>
      </div>
    </div>
  </div>
</template>
<script>
  import banner from 'components/banner/banner'
  import article from 'components/article/article'
  import sidebar from 'components/sidebar/sidebar'

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG']
      }
    },
    components: {
      banner: banner,
      'v-article': article,
      sidebar: sidebar
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .home
    width 100%
    margin-top 56px
    .container
      width 1200px
      max-width 1200px
      margin 0 auto
      font-size 0
      .main-wrapper
        display inline-block
        .article
          margin 10px 0
          .init-enter-active, .init-leave-active
            transition all 0.5s ease
          .init-enter, .init-leave-active
            opacity 0
            bottom 0
      .sidebar-wrapper
        display inline-block
        vertical-align top
        width 380px
        margin-left 20px
        .sidebar
          margin 10px 0
</style>
