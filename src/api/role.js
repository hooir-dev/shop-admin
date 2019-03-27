/**
 * 角色接口
 */
import request from '@/utils/request.js'

// 根据id获取角色
export const getUserById = (id) => {
  return request({
    url: `users/${id}`,
    method: 'GET'
  })
}

// 获取角色列表
export const getRoleslist = () => {
  return request({
    method: 'GET',
    url: '/roles'
  }).then(res => res.data)
}

// 修改用户角色
export const editUserRole = (id, rid) => {
  return request({
    url: `/users/${id}/role`,
    method: 'PUT',
    data: {
      rid
    }
  }).then(res => res)
}

// 添加角色
export const addRole = (roleName, roleDesc) => {
  return request({
    url: '/roles',
    method: 'POST',
    data: {
      roleName,
      roleDesc
    }
  }).then(res => res.data)
}

// 编辑角色
export const editRole = (id, roleName, roleDesc) => {
  return request({
    url: `/roles/${id}`,
    method: 'PUT',
    data: {
      roleName,
      roleDesc
    }
  }).then(res => res.data)
}
// 删除角色
export const delRole = (id) => {
  return request({
    url: `/roles/${id}`,
    method: 'DELETE'
  }).then(res => res.data)
}
