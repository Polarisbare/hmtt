<template>
  <div class="list-container">
    <!-- 文章列表 -->
    <article-item
      v-for="item in articleList"
      :key="item.art_id"
      :item="item"></article-item>
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
      articleList: []
    }
  },
  methods: {
    async articlesListFn () {
      const { data } = await articlesListAPI({
        channelId: this.channelId, // 默认推荐频道
        timestamp: +new Date()// 默认时间戳当前时间
      })
      // console.log('res', data)
      this.articleList = data.results
      this.timestamp = data.pre_timestamp
      console.log(222222, data)
    }
  },
  mounted () {
    this.articlesListFn()
  }
}
</script>
