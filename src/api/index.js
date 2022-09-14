// 接口封装
import requset from '@/utils/request'

export const fetchAllChannels = () => {
  return requset({
    url: '/v1_0/channels',
    method: 'GET'
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
/**
 * 获取所有频道
 * @returns
 */
export const myChannelsApi = () => {
  return requset({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
/**
 * 获取文章列表
 */
export const articlesListAPI = ({ channelId, timestamp }) => {
  return requset({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
