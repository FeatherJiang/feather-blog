<template>
  <div class="home">
    <div class="banner-wrapper">
      <banner></banner>
    </div>
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
  </div>
</template>
<script>
  import {bus} from '../../assets/js/bus.js'
  import banner from 'components/banner/banner'
  import profile from 'components/profile/profile'
  import sidebar from 'components/sidebar/sidebar'
  import loading from 'components/loading/loading'

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false
      }
    },
    methods: {
      homeScroll () {
        bus.$emit('homeScroll', window.scrollY)
        if (window.scrollY >= 250) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      }
    },
    created () {
      window.addEventListener('scroll', this.homeScroll)
    },
    components: {
      banner: banner,
      profile: profile,
      sidebar: sidebar,
      loading: loading
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
</style>
