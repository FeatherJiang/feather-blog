<template>
  <div class="search">
    <div class="container">
      <div class="main-wrapper">
        <transition-group tag="div" name="init">
          <router-link tag="a" class="profile-wrapper" :to="articleLink(article.id)" v-for="article in articleList" :key="article.id">
            <profile :article="article"></profile>
          </router-link>
        </transition-group>
        <div class="load-article" v-if="(articleList === null || articleList.length == 0) || loadingShow">
          <span  v-if="(articleList === null || articleList.length == 0) && !loadingShow">no article</span>
          <loading v-if="loadingShow"></loading>
        </div>
        <div class="loading-wrapper" @click="getMore" v-if="articleList !== null && articleList.length >= 10">
          <div class="more" v-show="showMore">
            {{text}}
          </div>
          <loading v-show="!showMore"></loading>
        </div>
      </div>
      <div class="sidebar-wrapper" :class="{'fixed': fixed}" v-if="tagList">
        <searchbar></searchbar>
        <sidebar v-for="(title, index) in sidebars" :title="title" :tags="tagList[index]"></sidebar>
      </div>
    </div>
    <div class="backtotop-wrapper">
      <backtotop></backtotop>
    </div>
  </div>
</template>
<script>
  import {urlParse} from '../../assets/js/urlParse'
  import banner from 'components/banner/banner'
  import mediabanner from 'components/mediabanner/mediabanner'
  import profile from 'components/profile/profile'
  import sidebar from 'components/sidebar/sidebar'
  import loading from 'components/loading/loading'
  import backtotop from 'components/backtotop/backtotop'
  import searchbar from 'components/searchbar/searchbar'

  const OK = 1

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false,
        showMore: true,
        loadingShow: true,
        text: 'more',
        bannerList: null,
        articleList: null,
        page: 1,
        tagList: null
      }
    },
    methods: {
      searchScroll () {
        if (window.scrollY > 0) {
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
        let param = urlParse()
        if (param.text !== undefined) {
          this.$http.post('/api/getSearchList', {text: param.text, page: this.page})
            .then(function (response) {
              let res = response.data
              Vue.showMore = true
              if (res.code === OK) {
                if (res.data.articleList.length !== 0) {
                  Vue.articleList = Vue.articleList.concat(res.data.articleList)
                  Vue.page += 1
                } else {
                  Vue.text = 'no more'
                }
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        } else {
          Vue.loadingShow = false
        }
      },
      getSearch () {
        this.page = 1
        this.articleList = null
        this.loadingShow = true
        let Vue = this
        let param = urlParse()
        if (param.text !== undefined) {
          this.$http.post('/api/getSearchList', {text: param.text, page: this.page})
            .then(function (response) {
              let res = response.data
              Vue.loadingShow = false
              if (res.code === OK) {
                if (res.data.articleList.length !== 0) {
                  Vue.articleList = res.data.articleList
                  Vue.page += 1
                }
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        } else {
          Vue.loadingShow = false
        }
      }
    },
    created () {
      let Vue = this
      window.addEventListener('scroll', this.searchScroll)
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
      this.getSearch()
    },
    watch: {
      '$route': 'getSearch'
    },
    components: {
      banner: banner,
      mediabanner: mediabanner,
      profile: profile,
      sidebar: sidebar,
      loading: loading,
      backtotop: backtotop,
      searchbar: searchbar
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .search
    width 100%
    .container
      width 1200px
      max-width 1200px
      margin 0 auto
      font-size 0
      .main-wrapper
        display inline-block
        width 800px
        .profile-wrapper
          display block
          margin 10px 0
        .load-article
          width 100%
          height 25px
          margin 10px 0
          padding 5px 0
          text-align center
          line-height 25px
          font-size 20px
          color #4285f4
          background #fff
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          border-radius 2px
          .loading
            text-align justify
            margin 0 auto
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
          transition all .5s ease
        .init-enter
          transform translate(0, 30px)
          opacity 0
        .init-leave-active
          display none
      @media (max-width 1200px)
        .main-wrapper
          width 100%
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
      @media (max-width 1200px)
        .sidebar-wrapper
          display none
    @media (max-width 1200px)
      .container
        width 100%
        padding 0 10px
        box-sizing border-box
    .backtotop-wrapper
      position fixed
      left 50%
      bottom 50px
      margin-left 220px
    @media (max-width 1200px)
      .backtotop-wrapper
        right 20px
        left auto
        opacity 0.8
</style>
