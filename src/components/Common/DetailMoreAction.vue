<template>
  <cube-popup
    type="extend-popup"
    :mask="true"
    ref="moreActionPop"
    position="bottom"
    :maskClosable="true"
  >
    <div class="more_action_pop_content">
      <div class="pop_action">
        <div class="action_item">
          <img src="../../assets/img/icon_pyq@2x.png" alt=""><span>朋友圈</span>
        </div>
        <div class="action_item">
          <img src="../../assets/img/icon_publish@2x.png" alt=""><span>发布</span>
        </div>
        <div class="action_item">
          <img src="../../assets/img/icon_edit@2x.png" alt=""><span>编辑</span>
        </div>
        <div class="action_item">
          <img src="../../assets/img/icon_delete@2x.png" alt=""><span>删除</span>
        </div>
        <div class="action_item">
          <img src="../../assets/img/icon_write@2x.png" alt=""><span>修改标题</span>
        </div>
        <div class="action_item">
          <img src="../../assets/img/icon_download@2x.png" alt=""><span>下载</span>
        </div>
      </div>
      <div class="pop_cancel">取消</div>
    </div>
  </cube-popup>
</template>
<script>
export default {
  name: 'DetailMoreAction',
  data() {
    return {}
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.$refs.moreActionPop.show()
      } else {
        this.$refs.moreActionPop.hide()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.more_action_pop_content {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #ffffff;
}
</style>
