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
// 上传文件
export const upload = files => {
  const formData = new FormData()
  formData.append('file', files[0])
  return request({
    method: 'POST',
    url: '/upload',
    data: formData
  }).then(res => res.data)
}
