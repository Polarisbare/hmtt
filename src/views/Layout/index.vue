<template>
  <div>
    <!-- 二级路由页面 -->
    <div class="main-container">
      <router-view></router-view>
    </div>

    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replece icon="home-o" to="/">首页</van-tabbar-item>
      <!-- <van-tabbar-item icon="friends-o">标签</van-tabbar-item> -->
      <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
      <van-tabbar-item icon="search" to="/filter">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-index',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
   .main-container {
    position: fixed;
    top: 0;
    bottom: 50px;
    width: 100%;
  }
</style>
