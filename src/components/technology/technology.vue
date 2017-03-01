<template>
  <div class="technology">
    <div class="container">
      <div class="main-wrapper">
        <transition-group name="init">
          <router-link tag="div" to="article" v-for="n in 10" :key="n">
            <profile></profile>
          </router-link>
        </transition-group>
        <div class="loading-wrapper">
          <loading></loading>
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
  import profile from 'components/profile/profile'
  import sidebar from 'components/sidebar/sidebar'
  import loading from 'components/loading/loading'
  import backtotop from 'components/backtotop/backtotop'

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false
      }
    },
    methods: {
      technologyScroll () {
        if (window.scrollY >= 56) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    },
    created () {
      window.addEventListener('scroll', this.technologyScroll)
    },
    components: {
      profile: profile,
      sidebar: sidebar,
      loading: loading,
      backtotop: backtotop
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .technology
    width 100%
    .container
      width 1200px
      max-width 1200px
      margin 0 auto
      font-size 0
      .main-wrapper
        display inline-block
        .profile
          margin 10px 0
          .init-enter-active, .init-leave-active
            transition all 0.5s ease
          .init-enter, .init-leave-active
            opacity 0
      .sidebar-wrapper
        display inline-block
        vertical-align top
        width 380px
        margin-left 20px
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
