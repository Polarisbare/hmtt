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
// 用户基本资料   我的页面
export const myUserApi = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
    // 如果你的请求体内容是表单对象,
    // 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}
// 修改名称生日
export const updateNameApi = ({ name, birthday }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      birthday
    }
  })
}
// 搜索联想
export const getFilterListApi = ({ q }) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

// 搜索 - 结果列表
export const searchResultListAPI = ({ q, page = 1 }) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
