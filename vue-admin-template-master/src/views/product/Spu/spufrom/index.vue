<template>
  <div class="">
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <!--  v-model="spu.tmId" 这就是点击的下拉的数据收集到哪
          v-model的值为当前被选中的el-option的 value 属性值
        -->
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option :value="tm.id" :label="tm.tmName" v-for="(tm,index) in trademarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
      </el-form-item>


      <el-form-item label="SPU图片">
        <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select value="" :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect,index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-circle-plus-outline" :disabled="!attrIdAndAttrName"
          @click="addSaleAttr">添加销售属性</el-button>
        <el-table ref="singleTable" border style="width: 100%" :data="spu.spuSaleAttrList">
          <el-table-column align="center" label="序号" type="index" width="80"> </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="120"> </el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template scope="{row,$index}">
              <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="inputValue" ref="saveTagInput"
                size="small">
              </el-input>
              <el-button v-else class="button-new-tag" size="small">添加</el-button>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="{row,$index}">
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="emitscene">取消</el-button>
      </el-form-item>
    </el-form>



  </div>
</template>

<script>
  export default {
    name: "spufrom",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        spu: {
          category3Id: 0,
          description: "",
          spuName: "",
          tmId: 0,
          spuImageList: [{
            //   "id": 0,
            //   "imgName": "string",
            //   "imgUrl": "string",
            //   "spuId": 0
          }],

          spuSaleAttrList: [{
            //   "baseSaleAttrId": 0,
            //   "id": 0,
            //   "saleAttrName": "string",
            //   "spuId": 0,
            //   "spuSaleAttrValueList": [{
            //     "baseSaleAttrId": 0,
            //     "id": 0,
            //     "isChecked": "string",
            //     "saleAttrName": "string",
            //     "saleAttrValueName": "string",
            //     "spuId": 0
            //   }]
          }],

        },

        trademarkList: [],
        spuImageList: [],
        saleAttrList: [],
        attrIdAndAttrName: ''
      };
    },
    methods: {
      addSaleAttr(){
          const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');

          let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
          this.spu.spuSaleAttrList.push(newSaleAttr)

      },
      handleSuccess(response, file, fileList) {
        this.spuImageList = fileList
      },
      //点击事件触发父级元素绑定在他身上的changescene自定义事件
      emitscene() {
        this.$emit("changescene", 0)
      },
      handleRemove(file, fileList) {
        this.spuImageList = fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      async initSpuDate(spu) {
        let spuResult = await this.$API.spu.reqSpu(spu.id);
        if (spuResult.code == 200) {
          this.spu = spuResult.data
        }

        let trademarkListResult = await this.$API.spu.reqTrademarkList();
        if (trademarkListResult.code == 200) {
          this.trademarkList = trademarkListResult.data
        }


        let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
        if (spuImageResult.code == 200) {
          let listArr = spuImageResult.data

          listArr.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;

          })

          this.spuImageList = listArr
        }

        let saleResult = await this.$API.spu.reqbaseSaleAttrList();
        if (saleResult.code == 200) {
          this.saleAttrList = saleResult.data
        }





      }
    },
    computed: {
      unSelectSaleAttr() {
        let result = this.saleAttrList.filter(item => {
          return this.spu.spuSaleAttrList.every(item1 => {
            return item.name != item1.saleAttrName
          })


        })
        return result
      }
    }

  }
</script>

<style>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
