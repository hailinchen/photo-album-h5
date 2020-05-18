<template>
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
      <div class="pop_cancel" @click="hideMoreAction">取消</div>
    </div>
</template>
<script>
export default {
  name: 'DetailMoreAction',
  methods: {
    hideMoreAction() {
      this.$emit('hideMoreAction')
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

  .pop_action {
    width: 100%;
    background-color: #F4F4F4;
    padding: 92px 39px 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .action_item {
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 20%;
      margin-bottom: 30px;

      img {
        width: 100px;
        height: 100px;
      }

      span {
        font-size: 24px;
        line-height: 24px;
        color: #666666;
        margin-top: 16px;
      }
    }
  }

  .pop_cancel {
    height: 96px;
    line-height: 96px;
    text-align: center;
    color: #666666;
    font-size: 32px;
  }
}
</style>
