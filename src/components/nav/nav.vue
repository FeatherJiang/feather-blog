<template>
  <div class="nav">
    <a class="logo-wrapper" href="#">
      <img class="logo" src="../../assets/imgs/feather_white.png" width="50" height="50">
      <span class="text">feather's blog</span>
    </a>
    <ul class="nav-list">
        <navitem v-for="navItem in navList" :navItem="navItem"></navitem>
    </ul>
  </div>
</template>
<script>
  import navitem from 'components/navitem/navitem'

  export default {
    props: {
    },
    data () {
      return {
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
            subItems: ['Read', 'Music', 'Food', 'Travel']
          },
          {
            text: 'About Me',
            routerLink: 'aboutme',
            subItems: []
          },
          {
            text: 'Contact',
            routerLink: 'contact',
            subItems: []
          }
        ]
      }
    },
    components: {
      navitem: navitem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .nav
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
    .nav-list
      float right
</style>
