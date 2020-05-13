<template>
  <div class="add_comment_wrapper">
    <div class="mask" @click="close"></div>
    <div class="input_wrapper">
      <textarea
        v-model="value"
        class="input_box"
        placeholder="写评论"
        autofocus
        @input.stop="changeInput"
      ></textarea>
      <div class="input_footer_btn">
        <button class="btn_publish" @click.stop="handlePublish">
          发布评论
        </button>
        <button class="btn_cancel" @click.stop="handleCancel">取消</button>
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
  methods: {
    close() {
      this.value = ''
      this.$emit('cancelComment')
    },
    changeInput(e) {
      this.value = e.target.value
    },
    handlePublish() {
      this.$emit('publishComment', this.value)
      this.value = ''
    },
    handleCancel() {
      this.value = ''
      this.$emit('cancelComment')
    },
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
  z-index: 5;

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 0;
  }

  .input_wrapper {
    background-color: #ffffff;
    height: 406px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 84px 30px 24px;
    box-sizing: border-box;
    z-index: 1;

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
        margin-top: 24px;
      }

      .btn_cancel {
        background-color: #f4f4f4;
        color: #666666;
        margin-right: 20px;
      }

      .btn_publish {
        background-color: #2cb8f6;
        opacity: 0.35;
        color: #ffffff;
        margin-right: 20px;
      }
    }
  }
}
</style>
