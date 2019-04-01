/**
 * 商品接口
 */
import request from '@/utils/request.js'

// 商品列表数据
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 6 } = {}) => {
  return request({
    url: '/goods',
    method: 'GET',
    params: {
      query,
      pagenum,
      pagesize
    }
  }).then(res => res.data)
}

// 删除商品
export const delGoodsById = (id) => {
  return request({
    url: `/goods/${id}`,
    method: 'DELETE'
  }).then(res => res.data)
}

// 添加商品
export const addGoods = ({ goodsName, goodsCat, goodsPrice, goodsNumber, goodsWeight, attrs = [], pics = [], goodsIntroduce = '' }) => {
  return request({
    url: '/goods',
    method: 'POST',
    data: {
      goods_name: goodsName,
      goods_cat: goodsCat,
      goods_price: goodsPrice,
      goods_number: goodsNumber,
      goods_weight: goodsWeight,
      attrs,
      pics,
      goods_introduce: goodsIntroduce
    }
  }).then(res => res.data)
}
