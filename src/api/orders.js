/**
 * 订单管理接口
 */
import request from '@/utils/request.js'

export const getOrdersList = ({ pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: '/orders',
    params: {
      pagenum,
      pagesize
    }
  }).then(res => res.data)
}
