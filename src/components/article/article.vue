<template>
  <div class="article">
    <div class="container">
      <div class="main-wrapper">
        <div class="load-article" v-if="article === null || loadingShow">
          <span  v-if="article === null && !loadingShow">no article</span>
          <loading v-if="loadingShow"></loading>
        </div>
        <div class="main" v-if="article">
          <markdown :text="text"></markdown>
          <div class="footer">
            <span class="browse"><i class="fa fa-eye"></i>{{article.view}}</span>
            <span class="comment"><i class="fa fa-comments"></i>{{article.comment}}</span>
            <span class="like"><i class="fa fa-star"></i>{{article.like}}</span>
            <span class="time"><i class="fa fa-calendar"></i>{{article.date}}</span>
          </div>
          <div class="btn-wrapper">
            <span class="back" @click="back"><i class="fa fa-chevron-left"></i></span>
            <span :class="{'star':isStar, 'unstar':!isStar}" @click="star"><i class="fa" :class="{'fa-star': isStar, 'fa-star-o': !isStar}"></i></span>
          </div>
        </div>
        <div class="comment-wrapper" v-if="article">
          <comment @addComment="addComment"></comment>
        </div>
        <div class="commentitem-wrapper" v-if="article && article.commentList">
          <commentitem v-for="comment in article.commentList" :comment="comment"></commentitem>
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
  import comment from 'components/comment/comment'
  import commentitem from 'components/commentitem/commentitem'
  import sidebar from 'components/sidebar/sidebar'
  import backtotop from 'components/backtotop/backtotop'
  import markdown from 'components/markdown/markdown'
  import loading from 'components/loading/loading'

  import {urlParse} from '../../assets/js/urlParse'

  const OK = 1

  export default {
    data () {
      return {
        sidebars: ['TOPIC', 'TAG'],
        fixed: false,
        text: '',
        loadingShow: true,
        article: null,
        tagList: null,
        isStar: false
      }
    },
    methods: {
      // 侧边栏跟随滚动
      articleScroll () {
        if (window.scrollY >= 56) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      // 返回前一页面
      back () {
        window.history.back()
      },
      // 添加star
      star () {
        let Vue = this
        let param = urlParse()
        if (param.id !== undefined) {
          this.$http.post('/api/addLike', {id: param.id})
            .then(function (response) {
              let res = response.data
              if (res.code === OK) {
                Vue.isStar = true
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        }
      },
      // 添加评论
      addComment (comment) {
        this.article.commentList.push(comment)
      }
    },
    created () {
      let Vue = this
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
      window.addEventListener('scroll', this.articleScroll)
    },
    activated () {
      let Vue = this
      let param = urlParse()
      if (param.id !== undefined) {
        this.$http.post('/api/getArticleById', {id: param.id})
          .then(function (response) {
            let res = response.data
            Vue.loadingShow = false
            if (res.code === OK) {
              Vue.article = res.data.article
              Vue.text = res.data.article.content
              Vue.isStar = false
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    components: {
      comment: comment,
      commentitem: commentitem,
      sidebar: sidebar,
      backtotop: backtotop,
      markdown: markdown,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .article
    width 100%
    .container
      width 1200px
      max-width 1200px
      margin  0 auto
      font-size 0
      .main-wrapper
        display inline-block
        width 800px
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
        .main
          width 100%
          margin 10px 0
          background #fff
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .footer
            text-align right
            span
              display inline-block
              margin-right 10px
              font-size 14px
              color #7e8c8d
              cursor pointer
              &:last-child
                margin-right 20px
              &:hover
                color #4285f4
              i
                display inline-block
                margin-right 4px
        .comment-wrapper
          margin 10px 0
        .commentitem-wrapper
          margin 10px 0
          .commentitem
            margin 10px 0
      @media (max-width 1200px)
        .main-wrapper
          width 100%
      .btn-wrapper
        padding  10px 20px
        text-align left
        .back
          display inline-block
          width 50px
          height 30px
          margin-right 20px
          text-align center
          color #4285f4
          background #f7f7f7
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          transition all 0.2s ease
          &:hover
            color #fff
            background #4285f4
          i
            margin-left -4px
            line-height 32px
            font-size 20px
        .unstar
          display inline-block
          width 50px
          height 30px
          vertical-align top
          text-align center
          color #4285f4
          background #f7f7f7
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          transition all 0.5s ease
          &:hover
            color #fff
            background #4285f4
          i
            line-height 30px
            font-size 20px
        .star
          display inline-block
          width 50px
          height 30px
          vertical-align top
          text-align center
          color #fff
          background #4285f4
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          cursor pointer
          transition all 0.5s ease
          i
            line-height 30px
            font-size 20px
      .sidebar-wrapper
        display inline-block
        width 380px
        max-width 380px
        margin-left 20px
        vertical-align top
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
      z-index 10
      left 50%
      bottom 50px
      margin-left 220px
    @media (max-width 1200px)
      .backtotop-wrapper
        right 20px
        left auto
        opacity 0.8
</style>
