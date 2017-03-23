<template>
  <div class="home">
    <div class="banner-wrapper">
      <banner :banner="bannerList" v-if="bannerList"></banner>
    </div>
    <div class="container">
      <div class="main-wrapper">
        <transition-group name="init">
          <router-link tag="div" :to="articleLink(article.id)" v-for="article in articleList" :key="article.id">
            <profile :article="article"></profile>
          </router-link>
        </transition-group>
        <div class="noarticle" v-if="articleList === null || articleList.length == 0">
          <span>no article</span>
        </div>
        <div class="loading-wrapper" @click="getMore" v-if="articleList !== null && articleList.length >= 10">
          <div class="more" v-show="showMore">
            {{text}}
          </div>
          <loading v-show="!showMore"></loading>
        </div>
      </div>
      <div class="sidebar-wrapper" :class="{'fixed': fixed}" v-if="tagList">
        <sidebar v-for="(title, index) in sidebars" :title="title" :tags="tagList[index]"></sidebar>
      </div>
    </div>
    <div class="backtotop-wrapper">
      <backtotop></backtotop>
    </div>
  </div>
</template>
<script>
  import banner from 'components/banner/banner'
  import profile from 'components/profile/profile'
  import sidebar from 'components/sidebar/sidebar'
  import loading from 'components/loading/loading'
  import backtotop from 'components/backtotop/backtotop'

  const OK = 1

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false,
        showMore: true,
        text: 'more',
        bannerList: null,
        articleList: null,
        page: 1,
        tagList: null
      }
    },
    methods: {
      homeScroll () {
        if (window.scrollY >= 250) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      articleLink (id) {
        return 'article?id=' + id
      },
      getMore () {
        let Vue = this
        this.showMore = false
        this.$http.post('/api/getArticleList', {page: this.page})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              if (res.data.articleList.length !== 0) {
                Vue.articleList = Vue.articleList.concat(res.data.articleList)
                Vue.page += 1
              } else {
                Vue.text = 'no more'
              }
              Vue.showMore = true
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    created () {
      let Vue = this
      window.addEventListener('scroll', this.homeScroll)
      this.$http.post('/api/getBannerList', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.bannerList = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
      this.$http.post('/api/getArticleList', {page: this.page})
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.articleList = res.data.articleList
            Vue.page += 1
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      this.$http.post('/api/getTagList', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.tagList = res.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    components: {
      banner: banner,
      profile: profile,
      sidebar: sidebar,
      loading: loading,
      backtotop: backtotop
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .home
    width 100%
    .container
      width 1200px
      max-width 1200px
      margin 0 auto
      font-size 0
      .main-wrapper
        display inline-block
        width 800px
        .profile
          margin 10px 0
        .noarticle
          width 100%
          height 30px
          margin 20px 0
          text-align center
          line-height 30px
          font-size 20px
          color #4285f4

          background #fff
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          border-radius 2px
        .loading-wrapper
          margin 10px 0
          padding 5px 0
          background #fff
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          .more
            margin 0 auto
            line-height 25px
            font-size 20px
            text-align center
            color #4285f4
          .loading
            margin 0 auto
          .init-enter-active, .init-leave-active
            transition all 0.5s ease
          .init-enter, .init-leave-active
            opacity 0
      .sidebar-wrapper
        display inline-block
        vertical-align top
        width 380px
        margin-left 20px
        &.fixed
          position fixed
          top 56px
        .sidebar
          margin 10px 0
    .backtotop-wrapper
      position fixed
      left 50%
      bottom 50px
      margin-left 220px
</style>
