// 0440

import request from "@/utils/request"


export const reqSpuList= (page,limit,category3Id)=>{
    return request({
      url:`/admin/product/${page}/${limit}`,
      method:"get",
      params:{category3Id}
    })
}
