<template>
  <div class="preview_wrapper">
    <div class="close" @click="closePreview">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="preview_video no_card">
      <video class="myvideo">
        <source :src="previewInfo.preview_url" type="video/mp4" />
      </video>
    </div>
    <!-- <div class="preview_card" v-if="previewInfo.is_pay === 1">

    </div> -->
    <div class="preview_action">
      <div class="action bg_red">
        <img src="../assets/img/icon_add_white@2x.png" alt="" />
        <div class="action_txt">
          <p class="txt_b">一键生成特效相册里的图片</p>
          <p class="txt_s">上传一张正脸无遮挡的照片</p>
        </div>
        <i class="cubeic-arrow"></i>
      </div>
      <div class="action bg_blue">
        <img src="../assets/img/icon_add_white@2x.png" alt="" />
        <div class="action_txt">
          <p class="txt_b">选择本地照片</p>
          <p class="txt_s">
            手机里的照片制作特效相册(最多{{ previewInfo.img_ppt.length }}张)
          </p>
        </div>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previewInfo: {
      type: Object,
    },
  },
  methods: {
    closePreview() {
      console.log('close')
      this.$emit('closePreview')
    },
  },
}
</script>

<style lang="scss" scoped>
.preview_wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;

  .close {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 24px;
    top: 60px;
    z-index: 1;

    > .iconfont {
      color: #fff;
      font-size: 42px;
    }
  }

  .preview_video {
    height: calc(100% - 96px - 316px);

    &.no_card {
      height: calc(100% - 316px);
    }

    .myvideo {
      height: 100%;
      width: 100%;
    }
  }

  .preview_card {
    height: 96px;
    background: #988774;
  }

  .preview_action {
    width: 100%;
    height: 316px;
    background-color: #fff;
    padding: 20px 30px 0;
    position: absolute;
    bottom: 0;

    .action {
      margin-bottom: 20px;
      height: 128px;
      border-radius: 16px;
      display: flex;
      position: relative;
      align-items: center;

      &.bg_red {
        background: linear-gradient(
          135deg,
          rgba(255, 33, 78, 1) 0%,
          rgba(229, 25, 25, 1) 100%
        );
        box-shadow: 0px 0px 32px 0px rgba(255, 130, 130, 1);
      }
      &.bg_blue {
        background: linear-gradient(
          135deg,
          rgba(44, 184, 246, 1) 0%,
          rgba(35, 145, 252, 1) 100%
        );
        box-shadow: 0px 0px 32px 0px rgba(150, 198, 255, 1);
      }

      > img {
        width: 64px;
        height: 64px;
        margin-right: 24px;
        margin-left: 40px;
      }

      .action_txt {
        display: flex;
        flex-direction: column;

        .txt_b {
          font-weight: 500;
          font-size: 30px;
          color: rgba(255, 255, 255, 1);
        }
        .txt_s {
          font-size: 24px;
          color: #fff;
          margin-top: 10px;
          opacity: 0.75;
        }
      }

      > i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
  }
}
</style>
