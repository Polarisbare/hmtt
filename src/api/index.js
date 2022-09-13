// 接口封装
import requset from '@/utils/request'

export const fetchAllChannels = () => {
  return requset({
    url: '/v1_0/channels'
  })
}
