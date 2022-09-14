import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'// 到指定时间需要的插件
import 'dayjs/locale/zh'// 引入中文包
dayjs.extend(relativeTime)
dayjs.locale('zh')

export const timeFn = (targetTime) => {
  return dayjs().to(dayjs(targetTime))// 返回多久之前
}
