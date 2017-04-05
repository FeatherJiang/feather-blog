<template>
  <div class="mediabanner" ref="mediabanner">
    <ul class="media-banner-list" ref="bannerList">
      <li class="media-banner-item" v-for="item in banner">
        <a :href="item.link" target="_blank">
          <img :src="item.img">
        </a>
      </li>
    </ul>
    <ul class="item-list">
      <li class="item" :class="{'active': this.num === 0}"></li>
      <li class="item" :class="{'active': this.num === 1}"></li>
      <li class="item" :class="{'active': this.num === 2}"></li>
      <li class="item" :class="{'active': this.num === 3}"></li>
      <li class="item" :class="{'active': this.num === 4}"></li>
    </ul>
  </div>
</template>
<script>
  import Hammer from 'hammerjs'
  import {move} from '../../assets/js/move'

  export default {
    props: {
      banner: {
        type: Array
      }
    },
    data () {
      return {
        num: 0
      }
    },
    mounted () {
      var mc = new Hammer(this.$refs.bannerList)

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (Vue.num !== 4) {
          Vue.num++
          let width = Vue.$refs.mediabanner.offsetWidth
          move(Vue.$refs.bannerList, {left: -(Vue.num * width)})
        }
      })

      mc.on('swiperight', function (ev) {
        if (Vue.num !== 0) {
          Vue.num--
          let width = Vue.$refs.mediabanner.offsetWidth
          move(Vue.$refs.bannerList, {left: -Vue.num * width})
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .mediabanner
    position relative
    width 100%
    height 380px
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    overflow hidden
    .media-banner-list
      position absolute
      left 0
      width 500%
      height 380px
      font-size 0
      .media-banner-item
        display inline-block
        width 20%
        a
          display inline-block
          width 100%
          img
            width 100%
            height 380px
          @media (max-width 667px)
            img
              height 200px
    @media (max-width 667px)
      .media-banner-list
        height 200px
    .item-list
      position absolute
      width 100%
      bottom 0
      text-align center
      font-size 0
      .item
        display inline-block
        width 10px
        height 10px
        margin 10px 5px
        border 2px solid #4285f4
        border-radius 50%
        &.active
          background #4285f4
  @media (max-width 667px)
    .mediabanner
      height 200px
</style>
