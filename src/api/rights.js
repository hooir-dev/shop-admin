/**
 * 权限接口
 */
import request from '@/utils/request.js'

export const getRightsList = (type) => {
  return request({
    url: `/rights/${type}`,
    method: 'GET'
  }).then(res => res.data)
}
