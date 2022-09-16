// 接口封装
import request from '@/utils/request'

export const fetchAllChannels = () => {
  return request({
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
  return request({
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
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
/**
 * 获取文章列表
 */
export const articlesListAPI = ({ channelId, timestamp }) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
// 文章 - 详情
export const articleDetailAPI = (id) => {
  return request({
    // :id是后台规定的参数名
    // 前端要在对应路径位置传值(不要写:)
    url: `/v1_0/articles/${id}`,
    method: 'GET'
  })
}
// 作者关注
export const articleFollowApi = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 作者取关
export const articleunFollowApi = ({ target }) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
// 文章 喜欢
export const articleLikeApi = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 文章 取消喜欢
export const articleunLikeApi = ({ target }) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
