<template>
  <div>
    <!-- 顶部Tab栏 -->
    <van-tabs>
      <van-tab
      v-for="item in list"
      :key="item.id"
      :title="item.name">
        {{item.name}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { myChannelsApi } from '@/api'
export default {
  name: 'home-index',
  data () {
    return {
      list: []
    }
  },
  methods: {
    async myChannels () {
      const { data } = await myChannelsApi()
      // console.log(res)
      console.log(data)
      this.list = data.channels
    }
  },
  created () {
    this.myChannels()
  }
}
</script>

<style lang="less" scoped>
// /dee/ 会对less 和 scss 进行一个穿透  防止权重不够
/deep/ .van-tabs__line {
  background-color: #007bff !important;
}
</style>
