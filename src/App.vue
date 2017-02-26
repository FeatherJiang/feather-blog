<template>
  <div id="app">
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
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
    .switch-enter-active, .switch-leave-active
      transition all 0.5s ease
    .switch-enter
      transform translateX(100%)
    .switch-leave-active
      transform translateX(-100%)
</style>
