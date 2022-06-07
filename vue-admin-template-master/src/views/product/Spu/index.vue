<template>
  <div>
    <el-card style="margin: 30px 0;">
      <categorySelect @getCategoryId="getCategoryId" :show="!show"></categorySelect>
    </el-card>
    <el-card>
      <!-- 默认展示 -->
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border style="width: 100%" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="date" label="操作" width="320">
            <template scope="{row,$index}">
                <HintButton type="success" size="mini" icon="el-icon-circle-plus" title="添加Spu"></HintButton>
                <el-button type="warning" size="mini" icon="el-icon-edit" title="修改Spu"></el-button>
                <el-button type="info" size="mini" icon="el-icon-info" title="查看Spu"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" title="删除Spu"></el-button>
            </template>
          </el-table-column>
        </el-table>


          <el-pagination style="text-align: center;"
          @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="limit"
                :total="total"
                :current-page="page"
                :page-sizes="[3, 5,7]"
                layout="prev, pager, next, jumper,->,total, sizes">
              </el-pagination>



      </div>
    </el-card>



  </div>
    <!-- 看到14.50 封装按钮 -->
</template>

<script>
  export default {
    name: "Spu",
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        show: true,
        page:1,//当前第几页
        limit:3, //一页展示多少数据
        records:[],//spu列表数据
        total:0 //总共多少条数据
      }
    },
    methods: {
      getCategoryId({
        categoryId,
        leval
      }) {
        if (leval == 1) {
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
        } else if (leval == 2) {
          this.category2Id = categoryId
          this.category3Id = ''
        } else {
          this.category3Id = categoryId
          this.getSpuList()
        }
      },
      async getSpuList() {
        let {page,limit,category3Id} = this
         let result = await this.$API.spu.reqSpuList(page,limit,category3Id);
         console.log(result.data)
         if(result.code == 200){
              this.total = result.data.total
               this.records = result.data.records
         }
      },
      //点击分页器修改当前data里的第几页改为传过来的值 然后在发请求  trademark封装了 简写成一个函数 通过函数的默认参数
      handleCurrentChange(val){
          this.page = val
           this.getSpuList();
      },
      //切换每页显示几个数据
      handleSizeChange(limit) {
        this.limit = limit;
        this.getSpuList();
      },

    },

  }
</script>

<style>
</style>
