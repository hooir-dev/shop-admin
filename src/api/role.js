/**
 * 角色接口
 */
import request from '@/utils/request.js'

export const getUserById = (id) => {
  return request({
    url: `users/${id}`,
    method: 'GET'
  })
}

export const getRoleslist = () => {
  return request({
    method: 'GET',
    url: '/roles'
  }).then(res => res)
}

export const editUserRole = (id, rid) => {
  return request({
    url: `/users/${id}/role`,
    method: 'PUT',
    data: {
      rid
    }
  }).then(res => res)
}
