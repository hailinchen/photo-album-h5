<template>
  <div class="hot_comment" v-if="hotComment.length">
    <ul>
      <li
        class="hot_comment_item"
        v-for="item in hotComment"
        :key="item.commentId"
      >
        <!-- 没有回复 -->
        <div v-if="!item.isRes">
          <span class="name">{{ item.name }}:</span
          ><span class="content">{{ item.commentContent }}</span>
        </div>
        <!-- 有回复 -->
        <div v-if="item.isRes">
          <span class="name">{{ item.resName }}</span>
          <span class="content">回复</span>
          <span class="name">{{ item.name }}:</span>
          <span class="content">{{ item.resContent }}</span>
        </div>
      </li>
    </ul>
    <p class="all_comment_count" @click="showAllComment">查看全部{{commentCount}}条评论</p>
  </div>
</template>

<script>
export default {
  name: 'HotComment',
  props: {
    hotComment: {
      type: Array,
      default: []
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showAllComment() {
      this.$emit('showAllComment')
    }
  }
}
</script>