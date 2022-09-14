// 接口封装
import requset from '@/utils/request'

export const fetchAllChannels = () => {
  return requset({
    url: '/v1_0/channels'
  })
}
/**
 * 登录api
 * @param {*} param0
 * @returns
 */
export const loginApi = ({ mobile, code }) => {
  return requset({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
export const myChannelsApi = () => {
  return requset({
    url: '/v1_0/channels'
  })
}
