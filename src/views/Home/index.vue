<template>
  <div>
    <!-- 顶部Tab栏 -->
    <van-tabs>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <!-- 身体部位 article-list  用嵌套组件的形式-->
        <article-list :channelId="item.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './component/article-list.vue'
import { myChannelsApi } from '@/api'
export default {
  components: {
    ArticleList
  },
  name: 'home-index',
  data () {
    return {
      active: 0,
      channelList: []
    }
  },
  methods: {
    async myChannels () {
      const { data } = await myChannelsApi()
      // console.log(res)
      console.log(data)
      this.channelList = data.channels
    }
  },
  created () {
    this.myChannels()
  }
}
</script>

<style lang="less" scoped>
// /dee/ 会对less 和 scss 进行一个穿透  防止权重不够(深度作用选择器)
/deep/ .van-tabs__line {
  background-color: #007bff !important;
}
</style>
