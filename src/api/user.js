/**
 * 用户接口
 */
import request from '@/utils/request.js'

export const gitUserList = ({ pagenum = 1, pagesize = 5 }) => {
  return request({
    method: 'GET',
    url: '/users',
    params: { // 传递 GET 参数
      pagenum,
      pagesize
    }
  }).then(res => res)
}

export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: '/users',
    data: {
      username,
      password,
      email,
      mobile
    }
  }).then(res => res)
}

export const changeState = (id, state) => {
  return request({
    method: 'PUT',
    url: `/users/${id}/state/${state}`
  }).then(res => res)
}

export const delUser = (id) => {
  return request({
    method: 'DELETE',
    url: `/users/${id}`
  }).then(res => res)
}

export const editUser = (id, item) => {
  return request({
    url: `/users/${id}`,
    method: 'PUT',
    data: {
      mobile: item.mobile,
      email: item.email
    }
  }).then(res => res)
}
