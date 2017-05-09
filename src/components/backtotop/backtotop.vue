<template>
  <transition name="backfade">
    <div class="backtotop" @click="backToTop" v-show="showToTop">
      <i class="fa fa-chevron-up"></i>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        showToTop: false,
        toTop: null,
        speed: 0
      }
    },
    methods: {
      // 回到顶部
      backToTop () {
        this.toTop = setInterval(() => {
          let scrollY = window.scrollY ? window.scrollY : document.documentElement.scrollTop
          let speed = Math.ceil(scrollY / 5)
          if ((this.speed === 0 ? speed : this.speed) < speed) {
            this.speed = 0
            clearInterval(this.toTop)
          } else {
            this.speed = speed
          }
          window.scrollTo(0, (scrollY - speed))
          if (scrollY <= 2) {
            this.speed = 0
            clearInterval(this.toTop)
          }
        }, 20)
      }
    },
    created () {
      window.addEventListener('scroll', () => {
        let scrollY = window.scrollY ? window.scrollY : document.documentElement.scrollTop
        if (scrollY <= 300) {
          this.showToTop = false
        } else {
          this.showToTop = true
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .backtotop
    width 40px
    height 40px
    text-align center
    color #4285f4
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    cursor pointer
    transition all 0.5s ease
    &:hover
      color #fff
      background #4285f4
    i
      line-height 40px
      font-size 20px
  .backfade-enter-active, .backfade-leave-active
    transition all 0.5
  .backfade-enter, .backfade-leave-active
    opacity 0
</style>
