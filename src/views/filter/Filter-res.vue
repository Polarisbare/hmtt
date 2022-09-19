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
    <!-- 上拉加载 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      loading-text='正在为主人疯狂加载'
      :immediate-check='false'
    >
      <!-- 列表 -->
      <article-list-item
        v-for="article in list"
        :key="article.art_id"
        :item="article"
        @click.native="$router.push(`/detail?id=${article.art_id}`)"
      >
      </article-list-item>
    </van-list>

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
      list: [], // 数据列表
      loading: false,
      finished: false
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
    },
    // 上拉加载
    async onLoad () {
      // console.log(6666)
      this.page++
      const { data } = await searchResultListAPI({
        q: this.$route.query.q,
        page: this.page
      })
      // console.log(data)
      // 合并数组 重新渲染
      this.list = [...this.list, ...data.results]
      this.loading = false
      // console.log(res)
      // 判断后台是否还有数据没有的话就提醒用户
      // 根据总条数除页容量得出页数
      if (this.page >= data.total_count / 10) {
        this.finished = true
      }
    }
    // 点击文章每一条跳转到详情页

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
