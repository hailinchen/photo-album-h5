<template>
  <div class="home">
    <ul
      v-for="(item, index) in feedList"
      :key="
        item.value && item.value.post !== null ? item.value.post.post_id : index
      "
    >
      <template v-if="item.value && item.value.post !== null">
        <li>{{ item.value.post.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      feedList: 'feedList',
    }),
  },
  methods: {
    ...mapActions(['getFeedList']),
  },
  created() {
    this.$store.dispatch('getFeedList')
  },
}
</script>

<style lang="scss" scope>
[w-188-246] {
  width: 188px;
}
[w-188-246] {
  aspect-ratio: '188:246';
}

@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
  border: 1px solid transparent;
  border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}
</style>
