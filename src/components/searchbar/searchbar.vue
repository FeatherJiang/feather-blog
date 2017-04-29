<template>
  <div class="searchbar">
    <input type="text" class="search-text" v-model="text" @keyup.enter="search">
    <button class="search-btn" @click="search"><i class="fa fa-search"></i></button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    methods: {
      search () {
        let text = this.text
        this.text = ''
        this.$router.push({path: '/search', query: {text: text}})
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .searchbar
    display flex
    width 100%
    height 35px
    margin 10px 0
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    overflow hidden
    .search-text
      flex 1 1 auto
      font-size 14px
      text-indent 10px
      &:focus
        outline none
    .search-btn
      flex 0 0 50px
      padding 0
      margin 0
      color #fff
      background rgba(66,133,244,0.8)
      border none
      cursor pointer
      transition all .2s
      -webkit-appearance none
      &:hover
        background #4285f4
</style>
