<template>
  <div>
    <van-form @submit="onSubmit">
      <!-- onSubmit:所有的表单都通过校验时会自动执行的回调 并且通过回调参数可以收集到用户输入的数据 -->
      <!--  native-type="submit" 代表配合@submit事件进行工作 点击按钮的时候会自动触发submit事件 可以进行兜底校验的工作 并且手机用户输入的信息 -->
      <!-- 用户名输入框 -->
      <van-field
        :required="true"
        v-model="form.mobile"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            message: '请填写用户名',
            pattern: /^1[3456789]\d{9}$/,
            trigger: 'onChange',
          },
        ]"
      />
      <!-- 密码输入框 -->
      <van-field
        :required="true"
        v-model="form.code"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写密码',
            trigger: 'onChange',
            pattern: /^\d{6}$/,
          },
        ]"
      />
      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'login-index',
  data () {
    return {
      form: {
        mobile: '13888888888',
        code: '246810'
      }
    }
  },
  methods: {
    async onSubmit () {
      // 调用action里面的方法两种  一种mapActions  一种是this.$store.dispatch('方法'，需要的参数)
      try {
        await this.$store.dispatch('fetchLogin', this.form)
        Toast.success('登陆成功')
        const redirect = this.$route.query.redirect
        if (redirect) {
          this.$router.push(redirect)
        } else {
          this.$router.push('/')
        }
        // 业务楼记  vuex维护是数据逻辑 如果适合数据没有关系纯业务处理
        // 放在业务组件中
      } catch (error) {
        // console.log(1111, error)
        Toast.fail(error.response.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// /deep/ input:-webkit-autofill {
//   box-shadow: 0 0 0px 1000px white inset !important;
// }
</style>
