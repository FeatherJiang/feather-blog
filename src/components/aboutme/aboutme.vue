<template>
  <div class="aboutme">
    <loading v-if="loadingShow"></loading>
    <markdown v-if="!loadingShow" :text="text"></markdown>
  </div>
</template>
<script>
  import markdown from 'components/markdown/markdown'
  import loading from 'components/loading/loading'

  const OK = 1

  export default {
    data () {
      return {
        text: '',
        loadingShow: true
      }
    },
    created () {
      let Vue = this
      this.$http.post('api/getAboutMe', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.loadingShow = false
            Vue.text = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    },
    components: {
      markdown: markdown,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .aboutme
    width 900px
    margin 10px auto
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    .loading
      margin 0 auto
      padding 5px 0
  @media (max-width 1200px)
    .aboutme
      width 96%
</style>
