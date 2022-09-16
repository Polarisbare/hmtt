<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="profile.photo"
            @click="$refs.imgObject.click()"
          />
          <input
            type="file"
            v-show="false"
            ref="imgObject"
            @change="imgUpdate"
          />
        </template>
      </van-cell>
      <van-cell title="名称" is-link v-model="profile.name" @click="editName" />
      <van-cell
        title="生日"
        is-link
        v-model="profile.birthday"
        @click="editDate"
      />
    </van-cell-group>

    <!-- 对话框 -->
    <!-- 修改用户名称的对话框 -->
    <van-dialog
      v-model="showNameDialog"
      title="修改名称"
      show-cancel-button
      @confirm="updateNameFn"
    >
      <!-- 输入框 -->
      <van-field
        v-model.trim="userName"
        input-align="center"
        placeholder="请输入名称"
      />
    </van-dialog>

    <!-- 日历弹出层 -->
    <van-popup
      v-model="showDateDialog"
      position="bottom"
      :style="{ height: '30%' }"
    >
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :show-toolbar="true"
        @confirm="updateDate"
        />
    </van-popup>
  </div>
</template>

<script>
// updateNameApi
import { userProfileAPI, updatePhotoAPI, updateNameApi } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'user-edit',
  data () {
    return {
      profile: {}, // 用户基本资料
      showNameDialog: false, // 名称修改弹出层
      userName: '',
      showDateDialog: false, // 日历修改弹出层
      currentDate: new Date(), // 时间显示
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2025, 1, 1)
    }
  },
  methods: {
    async fetchProfile () {
      const res = await userProfileAPI()
      this.profile = res.data
    },
    // 上传图片
    async imgUpdate (e) {
      //   console.log(e.target.files[0])
      if (e.target.files.length === 0) return // 防止用户未选择图片
      const fd = new FormData()
      //   console.log('fd', fd)
      fd.append('photo', e.target.files[0])
      const res = await updatePhotoAPI(fd)
      //   console.log(res)
      this.profile.photo = res.data.photo // 更新最新头像
    },
    // 回显数据名称
    editName () {
      // 打开弹框
      this.showNameDialog = true
      // 回显数据
      this.userName = this.profile.name
    },
    // 修改名字
    async updateNameFn () {
      //   this.userName   你输入的信息
      this.profile.name = this.userName
      await updateNameApi({
        name: this.profile.name
      })
    },
    // 回显日期数据
    editDate () {
      this.showDateDialog = true
      // 回显时间显示
      this.currentDate = new Date(this.profile.birthday)
    },
    // 修改时间
    async updateDate () {
      const formatTime = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.profile.birthday = formatTime
      await updateNameApi({
        birthday: formatTime
      })
      this.showDateDialog = false
    }
  },
  mounted () {
    this.fetchProfile()
  }
}
</script>
