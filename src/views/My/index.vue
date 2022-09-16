<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="myUserInfoList.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{myUserInfoList.name}}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{myUserInfoList.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{myUserInfoList.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{myUserInfoList.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link @click="$router.push('/user-info')" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="loginOut"/>
    </van-cell-group>
  </div>
</template>

<script>
import { myUserApi } from '@/api'
export default {
  name: 'user-index',
  data () {
    return {
      myUserInfoList: []
    }
  },
  methods: {
    async myUser () {
      const { data } = await myUserApi()
      // console.log(data)
      this.myUserInfoList = data
    },
    loginOut () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认要退出登录吗？'
      }).then(() => {
        // 清除token
        this.$store.commit('removeToken')
        // 跳转login
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$router.fullpath
          }
        })
      })
    }
  },
  created () {
    this.myUser()
  }
}
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
