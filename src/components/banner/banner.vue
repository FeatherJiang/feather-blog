<template>
  <div class="banner">
    <div class="container" @mouseover="stopBanner" @mouseout="startBanner">
      <a :href="banner[3].link" target="_blank" class="box1" ref="box1"><img :src="banner[3].img"></a>
      <a :href="banner[4].link" target="_blank" class="box2" ref="box2"><img :src="banner[4].img"></a>
      <a :href="banner[0].link" target="_blank" class="box3" ref="box3"><img :src="banner[0].img"></a>
      <a :href="banner[1].link" target="_blank" class="box4" ref="box4"><img :src="banner[1].img"></a>
      <a :href="banner[2].link" target="_blank" class="box5" ref="box5"><img :src="banner[2].img"></a>
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
  export default {
    props: {
      banner: {
        type: Array
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
      // 设置定时器
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
          this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
          this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
          this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
          this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
          this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
        }
      }, 5000)
    },
    methods: {
      // 停止轮播图滚动
      stopBanner: function () {
        clearInterval(this.timer)
      },
      // 开始轮播图滚动
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
            this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
            this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
            this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
            this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
            this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
          }
        }, 5000)
      },
      // 点击下一个轮播图滚动
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
          this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
          this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
          this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
          this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
          this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
        }
      },
      // 点击下两个轮播图滚动
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
            this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
            this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
            this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
            this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
            this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
          }
        }
      },
      // 点击上一个轮播图滚动
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
          this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
          this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
          this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
          this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
          this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
        }
      },
      // 点击上两个轮播图滚动
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
            this.$refs['box' + i].style.zIndex = this.bannerList[i - 1].zIndex
            this.$refs['box' + i].style.top = this.bannerList[i - 1].top + 'px'
            this.$refs['box' + i].style.left = this.bannerList[i - 1].left + 'px'
            this.$refs['box' + i].style.width = this.bannerList[i - 1].width + 'px'
            this.$refs['box' + i].style.height = this.bannerList[i - 1].height + 'px'
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
        display block
        background #fff
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        overflow hidden
        transition all 1s ease
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
        background #000
        opacity 0
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
