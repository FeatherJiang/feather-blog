<template>
  <div class="commentitem">
    <div class="avatar">
      <img src="../../assets/imgs/deep_space.png" alt="">
    </div>
    <div class="comment-main">
      <div class="comment-content">
        <span class="name">feather : </span>
        <span class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores, at dignissimos dolor dolores eius eligendi eveniet explicabo fugiat illum libero magni minus nobis optio pariatur tenetur, voluptatum. Exercitationem, itaque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, consequuntur explicabo id illum ipsa quis ratione! Blanditiis commodi eligendi facilis fuga libero maiores molestias, nihil pariatur, quod, suscipit veritatis vero.</span>
      </div>
      <div class="comment-time">2001-3-4 23:12</div>
    </div>
  </div>
</template>
<script>

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .commentitem
    padding 20px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    .avatar
      display inline-block
      width 50px
      height 50px
      margin 0 10px 0 0
      img
        width 100%
        height 100%
        border-radius 50%
    .comment-main
      vertical-align top
      display inline-block
      width 700px
      .comment-content
        .name
          font-size 14px
          color #4285f4
        .text
          font-size 14px
      .comment-time
        text-align right
        font-size 14px
        color #7e8c8d
</style>
