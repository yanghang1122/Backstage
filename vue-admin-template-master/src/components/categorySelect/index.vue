<template>
  <div class="">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cform.category1Id" @change="handler1" :disabled="show">
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in category1" :key="c1.id" > </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cform.category2Id"  @change="handler2" :disabled="show">
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in category2" :key="c2.id" ></el-option>

        </el-select>
      </el-form-item>


      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cform.category3Id" @change="handler3" :disabled="show">
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in category3" :key="c3.id" ></el-option>
        </el-select>
      </el-form-item>




    </el-form>



  </div>
</template>

<script>
  export default {
    name: "categorySelect",
    props:["show"],
    data() {
      return {
        category1: [],
        category2: [],
        category3: [],
        cform: {
          category1Id: '',
          category2Id: '',
          category3Id: ''
        }
      }
    },
    mounted() {
      this.getCategory1()
    },
    methods: {
      async getCategory1() {
        let result = await this.$API.attr.reqCategory1List();
        if (result.code == 200) {
          this.category1 = result.data
        }

      },
      async handler1() {
        let { category1Id } = this.cform;
        this.$emit("getCategoryId",{categoryId:category1Id,leval:1})
        this.cform.category2Id = ''
        this.cform.category3Id = ''
        this.category2 = []
        this.category3 = []

        let result = await this.$API.attr.reqCategory2List(category1Id)
        if (result.code == 200) {
          this.category2 = result.data
        }
      },
      async handler2() {
        let { category2Id } = this.cform
         this.$emit("getCategoryId",{categoryId:category2Id,leval:2})
         this.cform.category3Id = ''
         this.category3 = []
        let result = await this.$API.attr.reqCategory3List(category2Id)
        if (result.code == 200) {
          this.category3 = result.data
        }
      },
      handler3(){
         let { category3Id } = this.cform
            this.$emit("getCategoryId",{categoryId:category3Id,leval:3})
      }
    }
  }
</script>

<style>
</style>
