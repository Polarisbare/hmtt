<template>
  <!-- 搜索结果页-头部导航 -->
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 列表 -->
    <article-list-item
      v-for="article in list"
      :key="article.art_id"
      :item="article"
    >
    </article-list-item>
    <!-- <article-list-item v-for="item in list" :key="item.art_id" :item="item"/> -->
  </div>
</template>

<script>
import ArticleListItem from '@/views/Home/component/article-list-item.vue'
// import ArticleListItem from '@/views/Home/component/article-list-item.vue'
import { searchResultListAPI } from '@/api'
export default {
  name: 'Filter-res',
  data () {
    return {
      page: 1, // 当前页数
      list: [] // 数据列表
    }
  },
  components: {
    ArticleListItem
  },
  methods: {
    async fetchList () {
      const { data } = await searchResultListAPI({
        q: this.$route.query.q,
        page: this.page
      })
      // console.log(data)
      this.list = data.results
      // console.log(this.list)
    }
  },
  mounted () {
    // console.log(this.$route.query.q)
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
