<template>
  <div class="nav">
    <a class="logo-wrapper" href="#">
      <img class="logo" src="../../assets/imgs/feather_white.png" width="50" height="50">
      <span class="text">feather's blog</span>
    </a>
    <div class="nav-btn" @click="toggleNavShow"><i class="fa fa-bars"></i></div>
    <ul class="nav-list">
        <navitem v-for="navItem in navList" :navItem="navItem"></navitem>
    </ul>
    <transition name="pull">
      <ul class="media-nav-list" v-show="navShow">
        <router-link class="media-nav-item" tag="li" :to="navItem.routerLink" v-for="navItem in navList">
          {{navItem.text}}
        </router-link>
        <searchbar></searchbar>
      </ul>
    </transition>
  </div>
</template>
<script>
  import navitem from 'components/navitem/navitem'
  import searchbar from 'components/searchbar/searchbar'

  export default {
    props: {
    },
    data () {
      return {
        navShow: false,
        navList: [
          {
            text: 'Home',
            routerLink: 'home',
            subItems: []
          },
          {
            text: 'Technology',
            routerLink: 'technology',
            subItems: ['HTML', 'CSS', 'JS', 'Node']
          },
          {
            text: 'Life',
            routerLink: 'life',
            subItems: ['Read', 'Music', 'Food']
          },
          {
            text: 'About Me',
            routerLink: 'aboutme',
            subItems: []
          }
        ]
      }
    },
    methods: {
      toggleNavShow () {
        this.navShow = !this.navShow
      }
    },
    watch: {
      '$route': function () {
        this.navShow = false
      }
    },
    components: {
      navitem: navitem,
      searchbar: searchbar
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .nav
    position relative
    width 100%
    height 56px
    padding 0 50px
    background #4285f4
    box-shadow 0 0 5px 0px #000
    box-sizing border-box
    .logo-wrapper
      float left
      font-size 0
      img
        display inline-block
        margin 3px 10px 3px 0px
      .text
        line-height 56px
        vertical-align top
        font-size 20px
        font-weight 500
        color #fff
    .nav-btn
      float right
      width 30px
      height 30px
      margin 13px 0
      text-align center
      line-height 30px
      font-size 20px
      color #fff
      border 1px solid #fff
      border-radius 2px
    @media (min-width 1200px)
      .nav-btn
        display none
    .nav-list
      float right
    @media (max-width 1200px)
      .nav-list
        display none
    .media-nav-list
      display none
      position absolute
      z-index -1
      left 0
      bottom -175px
      width 100%
      padding 0 10px
      box-sizing border-box
      .media-nav-item
        width 100%
        height 30px
        margin 5px auto
        text-align center
        line-height 30px
        color #fff
        background #4285f4
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .searchbar
        margin 0
        height 30px
    @media (max-width 1200px)
      .media-nav-list
        display block
    .pull-enter-active, .pull-leave-active
      transition all .5s ease
    .pull-enter, .pull-leave-active
      transform translate(0, -175px)
  @media (max-width: 677px)
    .nav
      padding 0 10px
</style>
