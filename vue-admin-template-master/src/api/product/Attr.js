// 0656
import request from '@/utils/request';


export const reqCategory1List = ()=>{
  return request({
        url:"/admin/product/getCategory1",
        method:"get"
  })
}

export const reqCategory2List = (category2Id)=>{
  return request({
        url:`/admin/product/getCategory2/${category2Id}`,
        method:"get"
  })
}

export const reqCategory3List = (category3Id)=>{
  return request({
        url:`/admin/product/getCategory3/${category3Id}`,
        method:"get"
  })
}


export const reqAttrList = (category1Id,category2Id,category3Id)=>{
  return request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:"get"
  })
}

export const reqAddOrupdateAttr = (data)=>{
  return request({
    url:"/admin/product/saveAttrInfo",
    method:"post",
    data
  })
}
