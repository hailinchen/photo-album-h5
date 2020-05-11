<template>
  <li class="item" v-for="item in feedList" :key="item.post.post_id">
    <div class="item_top">
      <h2>{{ item.post.title }}</h2>
      <img class="cover_img" :src="item.post.conver_url" alt="" />
      <span class="play_count">{{ item.post.play_count }}次</span>
    </div>
    <div class="item_bottom">
      <img class="avatar" :src="item.user.user_icon" alt="" />
      <span class="name">{{ item.user.name }}</span>
      <span class="like_count">{{ item.post.like_count }}</span>
      <span class="comment_count">{{ item.post.comment_count }}</span>
    </div>
  </li>
</template>
