<template>
  <div class="add_comment_wrapper">
    <div class="input_wrapper">
      <textarea class="input_box" placeholder="写评论" autofocus></textarea>
      <div class="input_footer_btn">
        <button class="btn_cancel">取消</button>
        <button class="btn_publish">发布评论</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputComment',
  data() {
    return {
      value: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.add_comment_wrapper {
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 5;

  .input_wrapper {
    background-color: #ffffff;
    height: 406px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 84px 30px 24px;
    box-sizing: border-box;

    .input_box {
      display: block;
      width: 690px;
      height: 210px;
      background-color: #fafafa;
      border-radius: 16px;
      padding: 18px 26px;
      box-sizing: border-box;
    }

    .input_footer_btn {

      button {
        width: 168px;
        height: 64px;
        float: right;
        border-radius: 8px;
        font-size: 28px;
      }

      .btn_cancel {
        background-color: #F4F4F4;
        color: #666666;
        margin-right: 20px;
      }

      .btn_publish {
        background-color: #2CB8F6;
        opacity:0.35;
        color: #FFFFFF;
      }
    }
  }
}
</style>
