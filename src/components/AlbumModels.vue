<template>
  <ul class="list_wrapper">
    <li class="item" v-for="item in list" :key="item.template_id">
      <div
        class="item_cover"
        :style="{
          background: `url(${item.preview_img}) no-repeat`,
          backgroundSize: 'cover',
        }"
        @click="selectModel(item)"
      >
        <img src="../assets/img/bobo@2x.png" alt="" class="icon_play" />
        <img v-if="item.is_pay === 1" class="icon_vip" src="../assets/img/icon_vip@2x.png" alt="">
      </div>
      <h2 class="item_title">{{ item.template_name }}</h2>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {
    selectModel(item) {
      this.$emit('selectModel', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.list_wrapper {
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;

  .item {
    display: flex;
    flex-direction: column;
    width: calc((100% - 20px) / 2);
    height: 518px;
    border-radius: 12px;
    background: #ffffff;
    margin-bottom: 20px;
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);

    .item_cover {
      width: 100%;
      height: 446px;
      border-radius: 12px 12px 0 0;
      position: relative;

      .icon_play {
        width: 88px;
        height: 88px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .icon_vip {
        width: 42px;
        height: 42px;
        position: absolute;
        right: 16px;
        top: 16px;
        z-index: 1;
      }
    }

    .item_title {
      font-size: 32px;
      text-align: center;
      color: #212121;
      height: 72px;
      line-height: 72px;
      font-weight: 500;
    }

    &:nth-child(2n + 1) {
      margin-right: 20px;
    }
  }
}
</style>
