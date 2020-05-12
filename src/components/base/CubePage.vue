<template>
  <div class="cube-page" :class="type">
    <header class="header" :style="{ backgroundColor: titleBgColor }">
      <h1>{{ title }}</h1>
      <i
        v-if="isBack"
        @click="back"
        class="iconfont icon-back"
        :style="{ color: backColor }"
      ></i>
    </header>

    <div class="wrapper">
      <section class="desc" v-show="desc">
        <slot name="desc">{{ desc }}</slot>
      </section>
      <main class="content">
        <slot name="content">{{ content }}</slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cube-page',
  props: {
    title: {
      type: String,
      default: '美脸',
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    titleBgColor: {
      type: String,
      default: '#D43D3D',
    },
    isBack: {
      type: Boolean,
      default: false,
    },
    backColor: {
      type: String,
      default: '#484848',
    },
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scope>
.cube-page {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .header {
    position: relative;
    height: 88px;
    line-height: 88px;
    text-align: center;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;

    h1 {
      font-size: 40px;
      font-weight: 500;
      color: #ffffff;
      height: 88px;
      line-height: 88px;
      text-align: center;
      margin: 0;
    }

    .icon-back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 15px;
      font-size: 55px;
    }
  }

  .wrapper {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 98px);
    .desc {
      padding: 10px;
      margin: 10px 0;
      line-height: 20px;
      font-size: 14px;
    }
  }

  .content {
    height: 100%;
    position: relative;
  }
}
</style>
