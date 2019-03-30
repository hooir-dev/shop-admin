/**
 * 商品分类参数接口封装
 */

import request from '@/utils/request'

/**
 * 获取商品分类参数列表
 */
export const getGoodsCategoryAttr = (id, sel = 'many') => request({
  method: 'GET',
  url: `categories/${id}/attributes`,
  params: { // GET 参数
    sel
  }
}).then(res => res.data)
