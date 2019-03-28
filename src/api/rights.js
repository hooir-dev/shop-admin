/**
 * 权限接口
 */
import request from '@/utils/request.js'

// 所有权限列表
export const getRightsList = (type) => {
  return request({
    url: `/rights/${type}`,
    method: 'GET'
  }).then(res => res.data)
}

// 左侧菜单权限
export const getRightsMeun = () => {
  return request({
    url: '/menus',
    method: 'GET'
  }).then(res => res.data)
}
