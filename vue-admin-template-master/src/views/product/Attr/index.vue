<template>
  <div>

    <el-card style="margin: 50px 0;">
      <categorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></categorySelect>
    </el-card>


    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" class="el-icon-plus" style="margin-bottom: 50px;" :disabled="!category3Id"
          @click="addAttr">添加
        </el-button>
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性值" width="120">
          </el-table-column>
          <el-table-column prop="date" label="属性列表" width="width">
            <!-- row就是外层的大数据attrList -->
            <template scope="{row,$index}">
              <el-tag v-for="(attr,index) in row.attrValueList" style="margin-left: 20px;">{{attr.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="120">
            <template scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item label="属性名">
            <el-input placeholder="请添加属性名" v-model="attrinfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="el-icon-plus" :disabled="!attrinfo.attrName" @click="addAttrValue">添加
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>

        <el-table ref="singleTable" style="width: 100%;margin: 30px 0;" border :data="attrinfo.attrValueList">
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template scope="{row,$index}">
              <el-input placeholder="请输入内容" v-model="row.valueName" v-if="row.flag" @blur="toLook(row)"
                @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗`" @onConfirm="deleteAttr($index)">
                <el-button type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrinfo.attrValueList.length < 1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>



    </el-card>


  </div>
</template>

<script>
  import cloneDeep from "lodash/cloneDeep"
  export default {
    name: "Attr",
    data() {
      return {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        attrList: [],
        isShowTable: true,
        attrinfo: {
          attrName: "",
          attrValueList: [

          ],
          categoryId: 0,
          categoryLevel: 3,
        }
      }
    },
    methods: {
      async addOrUpdateAttr(){
       this.attrinfo.attrValueList = this.attrinfo.attrValueList.filter((item)=>{
          if(item.valueName != ''){
              delete item.flag
              return true
          }
        })


        try{
           let result =  await this.$API.attr.reqAddOrupdateAttr(this.attrinfo);
           if(result.code == 200){
              this.$message("成功")
              this.isShowTable = true
               this.getAttrList()
           }
        }catch(e){
          //TODO handle the exception
        }

      },
      deleteAttr(index){
          this.attrinfo.attrValueList.splice(index,1)
      },
      toEdit(row,index){
        row.flag = true
       this.$nextTick(()=>{
          this.$refs[index].focus()
       })

      },
      toLook(row) {
        if (row.valueName.trim() == '') {
          this.$message("不能为空")
          return false
        }
        let result = this.attrinfo.attrValueList.some((item) => {
          if (item != row) {
            return row.valueName == item.valueName
          }
        })
        if (result) {
          this.$message("重复了")
          return
        }
        row.flag = false
      },



      updateAttr(row) {
        this.isShowTable = false;
        this.attrinfo = cloneDeep(row);
        this.attrinfo.attrValueList.forEach((item)=>{
          this.$set(item,"flag",false)
        })


      },
      addAttr() {
        this.isShowTable = false;
        this.attrinfo = {
          attrName: "",
          attrValueList: [

          ],
          categoryId: this.category3Id,
          categoryLevel: 3,
        }
      },
      addAttrValue() {
        this.attrinfo.attrValueList.push({
          attrId: this.attrinfo.id,
          valueName: '',
          flag: true
        })

      this.$nextTick(()=>{
        this.$refs[this.attrinfo.attrValueList.length -1].focus()
      })


      },
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
          this.getAttrList()
        }

      },
      async getAttrList() {
        let {
          category1Id,
          category2Id,
          category3Id
        } = this
        let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id);
        if (result.code = 200) {
          this.attrList = result.data
        }
      }



    }
  }
</script>

<style>
</style>
