<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{articleDetailList.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="articleDetailList.aut_name" :label="_timeFn(articleDetailList.pubdate)">
        <template #icon>
          <img :src="articleDetailList.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="articleDetailList.is_followed" @click="followFn">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else  @click="followFn"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="articleDetailList.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="articleDetailList.attitude===1" @click="articleLike"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else-if="articleDetailList.attitude===-1" @click="articleLike"
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { timeFn } from '@/utils/time'
import { articleDetailAPI, articleFollowApi, articleunFollowApi, articleunLikeApi, articleLikeApi } from '@/api'
export default {
  name: 'detail-index',
  data () {
    return {
      articleDetailList: []
    }
  },
  methods: {
    _timeFn: timeFn,
    async articleDetail () {
      const { data } = await articleDetailAPI(this.$route.query.id)
      this.articleDetailList = data
    },
    // 作者关注-取消关注
    async followFn () {
      if (this.articleDetailList.is_followed) {
        // 现在是已关注状态 点击变成取消关注
        await articleunFollowApi({ target: this.articleDetailList.aut_id })
      } else {
        // 点击变成关注
        articleFollowApi({ target: this.articleDetailList.aut_id })
      }
      this.articleDetailList.is_followed = !this.articleDetailList.is_followed
    },
    // 文章点赞-取消点赞
    async articleLike () {
      if (this.articleDetailList.attitude === -1) {
        // 未点赞   点击点赞
        this.articleDetailList.attitude = 1
        await articleLikeApi({ target: this.articleDetailList.art_id })
      } else if (this.articleDetailList.attitude === 1) {
        this.articleDetailList.attitude = -1
        await articleunLikeApi({ target: this.articleDetailList.art_id })
      }
    }
  },
  mounted () {
    this.articleDetail()
  },
  activated () {
    this.articleDetail()
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
