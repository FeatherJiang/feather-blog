<template>
  <div class="aboutme">
    <markdown :text="text"></markdown>
  </div>
</template>
<script>
  import markdown from 'components/markdown/markdown'

  const OK = 1

  export default {
    data () {
      return {
        text: ''
      }
    },
    created () {
      let Vue = this
      this.$http.post('api/getAboutMe', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.text = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    },
    components: {
      markdown: markdown
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .aboutme
    width 900px
    margin 20px auto
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
</style>
