/**
 * 公共接口
 */
import request from '@/utils/request.js'

export const login = (data) => {
  let a = request({
    method: 'POST',
    url: '/login',
    data
  }).then(res => res)
  return a
}
