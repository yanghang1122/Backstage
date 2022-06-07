<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 20px;" @click="addPop">添加</el-button>


    <el-table style="width: 100%; margin-top: 50px;" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">

      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">

      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <template scope="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="width">
        <template scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updatePop(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(list[$index].id)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>


    <el-pagination style="text-align: center;" :current-page="page" :total="total" :page-size="limit"
      :page-sizes="[3,5,10]" layout=" prev, pager, next,jumper,->,total, sizes" @current-change="getPageList"
      @size-change="handleSizeChange">

    </el-pagination>


    <el-dialog :title="tradeMake.id ? '修改':'添加' " :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="tradeMake" ref="formName">

        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tradeMake.tmName"></el-input>
        </el-form-item>


        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tradeMake.logoUrl" :src="tradeMake.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtradeMakeList">确 定</el-button>
      </div>
    </el-dialog>








  </div>
</template>
<!-- 1830 -->
<script>
  export default {
    name: "tradeMark",
    data() {
      return {
        page: 1,
        limit: 3,
        total: 0,
        list: [],
        dialogFormVisible: false,
        imageUrl: '',
        tradeMake: {
          logoUrl: '',
          tmName: ""
        },
        rules: {
          tmName: [{
              required: true,
              message: '请输入品牌名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'change'
            }
          ],
          logoUrl: [{
            required: true,
            message: '请选择logo',
          }],
        }


      }
    },
    mounted() {
      this.getPageList();

    },
    methods: {
      async deleteTradeMark(index) {
        let result = await this.$API.trademark.deleteTradeMark(index);
        if (result.code == 200) {
          this.$message("删除成功")
          //删除之后判断当前页有第几个 如果大于一个留在当前页 小于1去上一页
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
        }
      },
      async getPageList(pager = 1) {
        this.page = pager
        let {
          page,
          limit
        } = this;

        let result = await this.$API.trademark.reqTradeMarklist(page, limit);
        if (result.code == 200) {
          this.total = result.data.total;
          this.list = result.data.records;
        }

      },
      //切换每页显示几个数据
      handleSizeChange(limit) {
        this.limit = limit;
        this.getPageList();
      },
      updatePop(row) {
        this.tradeMake = {
          ...row
        }
        this.dialogFormVisible = true
      },
      addPop() {
        this.tradeMake.logoUrl = '';
        this.tradeMake.tmName = '';
        this.dialogFormVisible = true
      },
      handleAvatarSuccess(res, file) {
        this.tradeMake.logoUrl = file.response.data
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addtradeMakeList() {

        this.$refs.formName.validate(async (valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tradeMake);
            if (result.code == 200) {
              this.getPageList(this.tradeMake.id ? this.page : 1);
              this.$message('成功');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });












      }


    },

  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
