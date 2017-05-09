<template>
  <div class="comments">
    <div class="avatar-wrapper">
      <img id="avatar" src="http://www.jiangfeather.com/images/imgAvatar.jpg" ref="img">
      <input id="avatar-btn" type="file" ref="fileImg" @change="addImg">
      <span class="modify">modify</span>
    </div>
    <div class="info-wrapper">
      <div class="name-wrapper">
        <label for="name" class="text">name</label>
        <input id="name" placeholder="required" v-model="comment.name">
      </div>
      <div class="email-wrapper">
        <label for="email" class="text">email</label>
        <input id="email" placeholder="optional" v-model="comment.email">
      </div>
    </div>
    <div class="text-wrapper">
      <label for="comment-content" class="text">comment</label>
      <textarea name="comment" id="comment-content" v-model="comment.content"></textarea>
    </div>
    <div class="submit-wrapper">
      <span id="comment-btn" @click="addComment">submit</span>
      <transition name="slip">
        <div class="hint" v-show="hintShow">{{text}}</div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {urlParse} from '../../assets/js/urlParse'
  import axios from 'axios'

  const OK = 1

  export default {
    data () {
      return {
        comment: {
          articleId: '',
          img: 'http://www.jiangfeather.com/images/imgAvatar.jpg',
          name: '',
          email: '',
          content: '',
          date: ''
        },
        hintShow: false,
        text: 'error',
        cancel: null
      }
    },
    methods: {
      // 显示选择图片
      addImg () {
        let resultFile = this.$refs.fileImg.files[0]
        let url = null
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(resultFile)
        } else if (window.URL !== undefined) {
          url = window.URL.createObjectURL(resultFile)
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(resultFile)
        }
        if (url) {
          this.$refs.img.setAttribute('src', url)
        }
      },
      // 添加评论
      addComment () {
        let Vue = this
        // 禁止空表单提交
        if (this.comment.name === '' || this.comment.content === '') {
          Vue.hintShow = true
          Vue.text = 'fail'
          setTimeout(function () {
            Vue.hintShow = false
          }, 2000)
        } else {
          let date = new Date()
          let param = urlParse()
          // 是否存在文章id
          if (param.id !== undefined) {
            this.comment.articleId = param.id
          } else {
            return
          }
          // 评论时间
          this.comment.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          let data = new FormData()
          data.append('articleId', this.comment.articleId)
          // 如果未添加图片使用默认图片，添加图片使用添加图片
          if (this.$refs.fileImg.value === '') {
            data.append('img', 'http://www.jiangfeather.com/images/imgAvatar.jpg')
          } else {
            data.append('img', this.$refs.fileImg.files[0])
          }
          data.append('name', this.comment.name)
          data.append('email', this.comment.email)
          data.append('content', this.comment.content)
          data.append('date', this.comment.date)

          // 防止表单重复提价，取消上一个请求
          if (Vue.cancel !== null) {
            Vue.cancel()
          }

          var CancelToken = axios.CancelToken

          this.$http.post('/api/addComment', data, {
            cancelToken: new CancelToken(function executor (c) {
              // An executor function receives a cancel function as a parameter
              Vue.cancel = c
            })
          })
            .then(function (response) {
              let res = response.data
              if (res.code === OK) {
                let comment = JSON.parse(JSON.stringify(Vue.comment))
                comment.avatar = res.data.avatar
                Vue.$emit('addComment', comment)
                Vue.comment.name = ''
                Vue.comment.email = ''
                Vue.comment.content = ''
                Vue.hintShow = true
                Vue.text = 'success'
                setTimeout(function () {
                  Vue.hintShow = false
                }, 2000)
              } else {
                Vue.hintShow = true
                Vue.text = 'fail'
                setTimeout(function () {
                  Vue.hintShow = false
                }, 2000)
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .comments
    display flex
    flex-wrap wrap
    padding 10px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    .avatar-wrapper
      flex 0 0 50px
      position relative
      display inline-block
      height 50px
      margin 10px
      border-radius 50%
      overflow hidden
      #avatar
        width 100%
        height 100%
      #avatar-btn
        position absolute
        z-index 4
        left 0
        width 50px
        height 50px
        border-radius 50%
        opacity 0
        cursor pointer
      .modify
        position absolute
        z-index 2
        left 0
        bottom 0
        display inline-block
        width 50px
        height 20px
        text-align center
        line-height 20px
        font-size 10px
        color #fff
        background rgba(0,0,0,0.5)
    .info-wrapper
      flex 1 1 auto
      vertical-align top
      margin 10px
      .name-wrapper
        display flex
        margin-bottom 6px
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          flex 0 0 50px
          width 50px
          padding 0 5px
          text-align center
          line-height 22px
          font-size 20px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #name
          flex 1 1 auto
          vertical-align top
          width 150px
          height 22px
          font-size 14px
          text-indent 5px
          background #f7f7f7
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
            background #fff
            border 2px solid #4285f4
            border-left 0
            outline none
      .email-wrapper
        display flex
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          flex 0 0 50px
          width 50px
          padding 0 5px
          text-align center
          line-height 22px
          font-size 20px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #email
          flex 1 1 auto
          vertical-align top
          width 150px
          height 22px
          font-size 14px
          text-indent 5px
          background #f7f7f7
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
            background #fff
            border 2px solid #4285f4
            border-left 0
            outline none
    .text-wrapper
      display flex
      flex 1 1 auto
      vertical-align top
      margin 10px
      border-radius 5px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .text
        flex 0 0 50px
        vertical-align top
        display inline-block
        padding 0 5px
        line-height 50px
        font-size 20px
        color #fff
        background #4285f4
        border-radius 5px 0 0 5px
      #comment-content
        flex 1 1 auto
        height 50px
        margin 0
        padding 5px
        line-height 18px
        background #f7f7f7
        border none
        border-radius 0 5px 5px 0
        box-sizing border-box
        &:focus
          background #fff
          border 2px solid #4285f4
          border-left 0
          outline none
    .submit-wrapper
      flex 0 1 80px
      position relative
      vertical-align top
      display inline-block
      width 80px
      height 30px
      margin 20px 10px
      text-align center
      #comment-btn
        position: absolute;
        z-index 2
        top 0
        left 0
        width 80px
        height 30px
        text-align center
        line-height 30px
        font-size 18px
        color #4285f4
        background #f7f7f7
        border none
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        transition all 0.5s ease
        cursor pointer
        &:hover
          color #f7f7f7
          background #4285f4
      .hint
        position absolute
        z-index 1
        top 30px
        left 0
        width 60px
        height 20px
        margin 0 0 0 10px
        text-align center
        line-height 20px
        font-size 16px
        color #f92452
        background #f7f7f7
        border-radius 0 0 5px 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .slip-enter-active, .slip-leave-active
        transition all 0.5s
      .slip-enter, .slip-leave-active
        transform translate(0,-30px)
</style>
