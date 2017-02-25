<template>
  <router-link class="nav-item-wrapper" tag="li" :to="navItem.routerLink">
    <div  class="nav-item" @mouseover="showSubList" @mouseout="hideSubList">
      <span class="nav-text">{{navItem.text}}</span>
      <transition name="fade">
        <ul class="nav-sub-list" @mouseout="hideSubList" v-show="subListShow && navItem.subItems.length">
          <li class="nav-sub-item" v-for="subItem in navItem.subItems">{{subItem}}</li>
        </ul>
      </transition>
    </div>
  </router-link>
</template>
<script>
  export default {
    props: {
      navItem: {
        type: Object
      }
    },
    data () {
      return {
        subListShow: false
      }
    },
    methods: {
      showSubList: function () {
        this.subListShow = true
      },
      hideSubList: function () {
        this.subListShow = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .nav-item-wrapper
    display inline-block
    &.router-link-active
      .nav-item
        color rgba(255, 255, 255, 1)
    .nav-item
      position relative
      display inline-block
      width 100px
      height 56px
      line-height 56px
      font-size 20px
      color rgba(255, 255, 255, 0.6)
      text-align center
      cursor pointer
      &.active
        color rgba(255, 255, 255, 1)
      &:hover
        color rgba(255, 255, 255, 1)
      .fade-enter-active, .fade-leave-active {
        transition: all .5s ease
        transition-delay .1s
      }
      .fade-enter, .fade-leave-active {
        transform translate(0, 14px)
        opacity: 0
      }
      .nav-sub-list
        position absolute
        z-index 5
        top 50px
        left 5px
        width 90px
        background #fff
        border-radius 2px
        box-shadow 0 0 5px 0 rgba(0, 0, 0, 0.26)
        &:before
          position absolute
          z-index 6
          top -5px
          left 40px
          display block
          content ''
          width 0
          height 0
          border-top 0 dashed transparent
          border-right 5px dashed transparent
          border-bottom 5px solid #fff
          border-left 5px dashed transparent
        &:after
          position absolute
          z-index 5
          top -6px
          left 40px
          display block
          content ''
          width 0
          height 0
          border-top 0 dashed transparent
          border-right 5px dashed transparent
          border-bottom 5px solid rgba(0, 0, 0, 0.26)
          border-left 5px dashed transparent
        .nav-sub-item
          display block
          height 30px
          line-height 30px
          font-size 18px
          font-weight 500
          color #7e8c8d
          &:hover
            color #4285f4
</style>
