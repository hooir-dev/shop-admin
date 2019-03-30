/**
 * 商品分类接口封装
 */

import request from '@/utils/request'

/**
 * 获取商品分类列表
 */
export const getGoodsCategoryList = (type = 3) => request({
  method: 'GET',
  url: '/categories',
  params: { // GET 参数
    type
  }
}).then(res => res.data)
