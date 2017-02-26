<template>
  <div class="banner">
    <div class="container" @mouseover="stopBanner" @mouseout="startBanner">
      <div class="box1" ref="box1"><img :src="banner.imgs[3]"></div>
      <div class="box2" ref="box2"><img :src="banner.imgs[4]"></div>
      <div class="box3" ref="box3"><img :src="banner.imgs[0]"></div>
      <div class="box4" ref="box4"><img :src="banner.imgs[1]"></div>
      <div class="box5" ref="box5"><img :src="banner.imgs[2]"></div>
      <div class="pre1" @click="preBanner2"></div>
      <div class="pre2" @click="preBanner1"></div>
      <div class="next1" @click="nextBanner1"></div>
      <div class="next2" @click="nextBanner2"></div>
    </div>
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
  import {move} from '../../assets/js/move.js'

  export default {
    props: {
      banner: {
        type: Object,
        default () {
          return {
            imgs: ['http://jiangfeather.com/imgs/login_bg.jpg', 'http://jiangfeather.com/imgs/helloadmin.png', 'http://jiangfeather.com/imgs/helloadmin.png', 'http://jiangfeather.com/imgs/helloadmin.png', 'http://jiangfeather.com/imgs/helloadmin.png'],
            routerLink: []
          }
        }
      }
    },
    data () {
      return {
        timer: null,
        num: 0,
        bannerList: [
          {zIndex: 1, top: 45, left: 0, width: 300, height: 160},
          {zIndex: 3, top: 25, left: 180, width: 360, height: 200},
          {zIndex: 5, top: 10, left: 400, width: 400, height: 230},
          {zIndex: 3, top: 25, left: 670, width: 360, height: 200},
          {zIndex: 1, top: 45, left: 900, width: 300, height: 160}
        ]
      }
    },
    created: function () {
      this.timer = setInterval(() => {
        this.bannerList.unshift(this.bannerList[this.bannerList.length - 1])
        this.bannerList.pop()
        this.num++
        if (this.num === 5) {
          this.num = 0
        }
        if (this.num === -1) {
          this.num = 4
        }
        for (let i = 1; i <= this.bannerList.length; i++) {
          move(this.$refs['box' + i], this.bannerList[i - 1])
        }
      }, 5000)
    },
    methods: {
      stopBanner: function () {
        clearInterval(this.timer)
      },
      startBanner: function () {
        this.timer = setInterval(() => {
          this.bannerList.unshift(this.bannerList[this.bannerList.length - 1])
          this.bannerList.pop()
          this.num++
          if (this.num === 5) {
            this.num = 0
          }
          if (this.num === -1) {
            this.num = 4
          }
          for (let i = 1; i <= this.bannerList.length; i++) {
            move(this.$refs['box' + i], this.bannerList[i - 1])
          }
        }, 5000)
      },
      nextBanner1: function () {
        this.bannerList.unshift(this.bannerList[this.bannerList.length - 1])
        this.bannerList.pop()
        this.num++
        if (this.num === 5) {
          this.num = 0
        }
        if (this.num === -1) {
          this.num = 4
        }
        for (let i = 1; i <= this.bannerList.length; i++) {
          move(this.$refs['box' + i], this.bannerList[i - 1])
        }
      },
      nextBanner2: function () {
        for (let i = 0; i < 2; i++) {
          this.bannerList.unshift(this.bannerList[this.bannerList.length - 1])
          this.bannerList.pop()
          this.num++
          if (this.num === 5) {
            this.num = 0
          }
          if (this.num === -1) {
            this.num = 4
          }
          for (let i = 1; i <= this.bannerList.length; i++) {
            move(this.$refs['box' + i], this.bannerList[i - 1])
          }
        }
      },
      preBanner1: function () {
        this.bannerList.push(this.bannerList[0])
        this.bannerList.shift()
        this.num--
        if (this.num === 5) {
          this.num = 0
        }
        if (this.num === -1) {
          this.num = 4
        }
        for (let i = 1; i <= this.bannerList.length; i++) {
          move(this.$refs['box' + i], this.bannerList[i - 1])
        }
      },
      preBanner2: function () {
        for (let i = 0; i < 2; i++) {
          this.bannerList.push(this.bannerList[0])
          this.bannerList.shift()
          this.num--
          if (this.num === 5) {
            this.num = 0
          }
          if (this.num === -1) {
            this.num = 4
          }
          for (let i = 1; i <= this.bannerList.length; i++) {
            move(this.$refs['box' + i], this.bannerList[i - 1])
          }
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .banner
    height 250px
    .container
      position relative
      width 1200px
      max-width 1200px
      height 240px
      margin 10px auto 0
      .box1, .box2, .box3, .box4, .box5
        position absolute
        background #fff
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        overflow hidden
        img
          width 100%
          height 100%
          border-radius 2px
      .box1
        z-index 1
        top 45px
        left 0px
        width 300px
        height 160px
      .box2
        z-index 3
        top 25px
        left 180px
        width 360px
        height 200px
      .box3
        z-index 5
        top 10px
        left 400px
        width 400px
        height 230px
      .box4
        z-index 3
        top 25px
        left 670px
        width 360px
        height 200px
      .box5
        z-index 1
        top 45px
        left 900px
        width 300px
        height 160px
      .pre1, .pre2, .next1, .next2
        position absolute
        border-radius 2px
        cursor pointer
      .pre1
        z-index 2
        top 45px
        left 0px
        width 300px
        height 160px
      .pre2
        z-index 4
        top 25px
        left 180px
        width 360px
        height 200px
      .next1
        z-index 4
        top 25px
        left 670px
        width 360px
        height 200px
      .next2
        z-index 2
        top 45px
        left 900px
        width 300px
        height 160px
    .item-list
      font-size 0
      text-align center
      .item
        display inline-block
        width 40px
        height 4px
        margin 5px 5px 0
        background rgba(255,255,255,0.6)
        &.active
          background rgba(255,255,255,1)
</style>
