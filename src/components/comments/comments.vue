<template>
  <div class="comments">
    <div class="avatar-wrapper">
      <img id="avatar" src="../../assets/imgs/deep_space.png" alt="">
      <input id="avatar-btn" type="file">
      <span class="hint">modify</span>
    </div>
    <div class="info-wrapper">
      <div class="name-wrapper">
        <label for="name" class="text">name</label>
        <input id="name" placeholder="required">
      </div>
      <div class="email-wrapper">
        <label for="email" class="text">email</label>
        <input id="email" placeholder="optional">
      </div>
    </div>
    <div class="text-wrapper">
      <label for="comment-content" class="text">comment</label>
      <textarea name="comment" id="comment-content"></textarea>
    </div>
    <span id="comment-btn">submit</span>
  </div>
</template>
<script>
  export default {

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
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
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
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
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
        border none
        border-radius 0 5px 5px 0
        box-sizing border-box
        &:focus
          border 2px solid #4285f4
          border-left 0
          outline none
    #comment-btn
      vertical-align top
      display inline-block
      margin 10px 0
      padding 0 5px
      line-height 30px
      font-size 20px
      color #4285f4
      background #f7f7f7
      border-radius 5px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      cursor pointer
      transition all 0.5s ease
      &:hover
        color #f7f7f7
        background #4285f4
</style>
