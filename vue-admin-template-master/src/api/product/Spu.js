// 0440

import request from "@/utils/request"


export const reqSpuList= (page,limit,category3Id)=>{
    return request({
      url:`/admin/product/${page}/${limit}`,
      method:"get",
      params:{category3Id}
    })
}

export const reqSpu = (spuId)=>{
  return request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get'
  })
}


export const reqTrademarkList = ()=>{
  return request({
    url:"/admin/product/baseTrademark/getTrademarkList",
    method:"get"
  })
}


export const reqSpuImageList = (spuId)=>{
  return request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:"get"
  })
}

export const reqbaseSaleAttrList = ()=>{
  return request({
    url:"/admin/product/baseSaleAttrList",
    method:"get"
  })
}
