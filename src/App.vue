<template>
  <div id="app">
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="empty"></div>
    <transition name="switch">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import nav from 'components/nav/nav'
  import home from 'components/home/home'

  export default {
    name: 'app',
    data () {
      return {
        scrollList: []
      }
    },
    components: {
      'v-nav': nav,
      home: home
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .nav-wrapper
      position fixed
      z-index 100
      top 0
      width 100%
    .empty
      height 56px
  .switch-enter-active, .switch-leave-active
    transition all 0.5s
  .switch-enter
    position absolute
    top 56pxs
    transform translate(100%, 0)
  .switch-leave-active
    position absolute
    top 56px
    transform translate(-100%, 0)
</style>
