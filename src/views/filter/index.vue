<template>
  <div>
    <!-- 搜索区域 -->
    <form action="/">
        <van-search
            v-model.trim="keyword"
            show-action
            placeholder="请输入搜索关键词"
            @input="inputFilterFn"
            @cancel="onCancel"
            background="#8fc08d"
        />
    </form>

    <!-- 搜索联想区域 -->
    <div class="sugg-list">
      <div class="sugg-item" v-for="item in filterList" :key="item" @click="FilterResFn(item)" >
        <!-- 富文本 -->
        <span v-html="formatStr(item)"></span>
      </div>
    </div>
    <!-- 搜索历史区 -->
    <div class="history" v-show="filterList.length === 0">
      <van-tag plain type="primary" v-for="item in historyList" :key="item" >
        {{item}}
      </van-tag>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import { Toast } from 'vant'
import { getFilterListApi } from '@/api'
export default {
  name: 'filter-index',
  data () {
    return {
      filterList: [],
      keyword: '', // 用户输入的文字
      historyList: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    // 渲染联想表
    // async inputFilterFn () {
    // //   console.log(6666)
    //   const { data } = await getFilterListApi({ q: this.keyword })
    //   this.filterList = data.options
    //   //   console.log(this.filterList)
    // //   const reg = new RegExp(this.keyWord, 'ig')
    // //   return this.filterList.replace(reg, function (p) {
    // //     return '<span style={color: red}>' + p + '</span>'
    // //   })
    // },
    inputFilterFn: _.debounce(async function () {
      if (this.keyword !== '') {
        const { data } = await getFilterListApi({ q: this.keyword })
        this.filterList = data.options
      } else {
        this.filterList = ''
      }
    }, 400),
    // 取消按钮
    onCancel () {
      Toast('您已取消搜索')
    },
    // 颜色
    formatStr (str) {
      const reg = new RegExp(this.keyword, 'ig')
      return str.replace(reg, (key) => {
        return `<span style="color:red;">${key}</span>`
      })
    },
    // 跳转
    FilterResFn (keyword) {
      this.historyList.push(keyword)
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
      this.$router.push({
        path: '/filter-res',
        query: {
          q: keyword
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
