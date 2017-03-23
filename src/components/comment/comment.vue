<template>
  <div class="comments">
    <div class="avatar-wrapper">
      <img id="avatar" src="http://www.jiangfeather.com/images/imgAvatar.jpg" alt="">
      <input id="avatar-btn" type="file">
      <span class="hint">modify</span>
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
      <textarea name="comment" id="comment-content" v-model="comment.comment"></textarea>
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

  const OK = 1

  export default {
    data () {
      return {
        comment: {
          articleId: '',
          img: 'http://www.jiangfeather.com/images/imgAvatar.jpg',
          name: '',
          email: '',
          comment: '',
          date: ''
        },
        hintShow: false,
        text: 'error'
      }
    },
    methods: {
      addComment () {
        let Vue = this
        let date = new Date()
        let param = urlParse()
        console.log(param)
        if (param.id !== undefined) {
          this.comment.articleId = param.id
        }
        this.comment.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
        this.$http.post('/api/addComment', this.comment)
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.$emit('addComment', Vue.comment)
              Vue.comment.name = ''
              Vue.comment.email = ''
              Vue.comment.comment = ''
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
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .comments
    padding 20px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    .avatar-wrapper
      position relative
      display inline-block
      width 50px
      height 50px
      margin-right 10px
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
      .hint
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
      vertical-align top
      display inline-block
      margin 0 10px 0 0
      .name-wrapper
        margin-bottom 6px
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          display inline-block
          width 50px
          padding 0 5px
          text-align center
          line-height 22px
          font-size 20px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #name
          vertical-align top
          display inline-block
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
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          display inline-block
          width 50px
          padding 0 5px
          text-align center
          line-height 22px
          font-size 20px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #email
          vertical-align top
          display inline-block
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
      vertical-align top
      display inline-block
      margin-right 10px
      border-radius 5px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .text
        vertical-align top
        display inline-block
        padding 0 5px
        line-height 50px
        font-size 20px
        color #fff
        background #4285f4
        border-radius 5px 0 0 5px
      #comment-content
        width 300px
        height 50px
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
      position relative
      vertical-align top
      display inline-block
      height 30px
      margin 10px 0
      text-align center
      #comment-btn
        position: absolute;
        z-index 2
        top 0
        left 50%
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
        left 50%
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
