<template>
  <div class="header" :style="{backgroundColor: bgColor}">
    <img
      class="icon_back"
      v-if="isBack"
      src="../../assets/icon_back@2x.png"
      alt="返回"
    />
    <div class="title">{{title}}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Header',
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#D43D3D',
    },
    title: {
      type: String,
      default: '美脸'
    },
  },
}
</script>

<style lang="scss" scope>
.header {
  height: 88px;
  position: relative;
  width: 100%;
  z-index: 2;

  .title {
    color: #ffffff;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }

  .icon_back {
    width: 48px;
    height: 50px;
    z-index: 1;
  }
}
</style>
