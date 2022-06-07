import request from '@/utils/request';

export const reqTradeMarklist = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
};



export const reqAddOrUpdateTradeMark = (trademark) => {
  if (trademark.id) {
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: trademark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: "post",
      data: trademark
    })
  }
}





export const deleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete"
  })
}
