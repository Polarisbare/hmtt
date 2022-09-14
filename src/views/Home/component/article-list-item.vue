<template>
  <van-cell>
    <!-- 标题区域的插槽 -->
     <template #title>
  <div class="title-box" v-if="item.cover.type === 0">
    <!-- 标题 -->
    <span>{{ item.title }}</span>
  </div>
  <div class="title-box" v-if="item.cover.type === 1">
    <!-- 标题 -->
    <span>{{ item.title }}</span>
    <!-- 单图 -->
    <img class="thumb" :src="item.cover.images[0]" />
  </div>
  <!-- 三张图片 -->
  <div class="thumb-box" v-if="item.cover.type > 1">
    <img
      class="thumb"
      v-for="(imgUrl, index) in item.cover.images"
      :key="index"
      :src="imgUrl"
    />
  </div>
</template>

    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ item.aut_name }}</span>
          <span>{{ item.comm_count }}评论</span>
          <span>{{ _timeFn(item.pubdate) }}</span>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeFn } from '@/utils/time'
export default {
  name: 'article-list-item',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    _timeFn: timeFn
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }

}
 /* 图片的样式, 矩形黄金比例：0.618 */
  .thumb {
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }

  /* 三图, 图片容器 */
  .thumb-box {
    display: flex;
    justify-content: space-between;
  }
</style>
