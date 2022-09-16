<template>
  <div class="list-container">
    <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
     success-text="刷新成功">
      <!--  :immediate-check="false" 表示首次不用上拉加载功能 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
      <!-- 文章列表 -->
      <article-item
        v-for="item in articleList"
        :key="item.art_id"
        :item="item"
        @click.native="$router.push(`/detail?id=${item.art_id}`)"
      ></article-item>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './article-list-item.vue'
import { articlesListAPI } from '@/api'
export default {
  components: {
    ArticleItem
  },
  name: 'article-list',
  props: {
    channelId: {
      type: Number
    }
  },
  data () {
    return {
      articleList: [],
      loading: false, // 是否正在加载中
      finished: false, // 是否加载了所有的数据
      isLoading: false

    }
  },
  methods: {
    // 铺设数据
    async articlesListFn () {
      const { data } = await articlesListAPI({
        channelId: this.channelId, // 默认推荐频道
        timestamp: +new Date() // 默认时间戳当前时间
      })
      // console.log('res', data)
      this.articleList = data.results
      this.timestamp = data.pre_timestamp
      // console.log(222222, data)
    },
    // 上拉加载事件
    async onLoad () {
      // 1. 准备获取下一页的必要参数
      // 2.调用接口获取下一页数据
      const res = await articlesListAPI({
        channelId: this.channelId, // 默认推荐频道
        timestamp: this.timestamp
      })
      // console.log(res)
      // 3.把老数据和新数据拼接
      this.articleList = [...this.articleList, ...res.data.results]
      // 4.更新后端的时间
      this.timestamp = res.data.pre_timestamp
      // 5.手动把loading 关闭
      this.loading = false
      // 6.判断数据库还是否有数据了 没有的话finished设置为true结束操作
      if (!this.timestamp) {
        this.finished = true
      }
    },
    // 下拉刷新事件
    async onRefresh () {
      this.timestamp = +new Date()// 改成最新时间
      await this.articlesListFn()// 更新最新数据
      // console.log('6666')
      this.isLoading = false// 关闭刷新状态
    }
  },
  mounted () {
    this.articlesListFn()
  }
}
</script>
<style scoped lang="less">
.list-container {
  position: fixed;
  top: 42px;
  bottom: 50px;
  width: 100%;
  overflow: scroll;
}
</style>
