<template>
  <div>
    <p>添加商品信息</p>
    <el-steps space="200px" align-center :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs tab-position="left" @tab-click="handleTabChange">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="formData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model.number="formData.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model.number="formData.goodsWeight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model.number="formData.goodsNumber"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              :options="goodsCategories"
              :props="{
                value: 'cat_id',
                label:'cat_name',
                children: 'children'
                }"
              v-model="formData.goodsCat">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formData.is_promote">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-row class="item-row" v-for="item in goodsCategoryAttr" :key="item.attr_id">
          <el-col :span="4">{{ item.attr_name }}</el-col>
          <el-col :span="20">
            <el-checkbox-group class="flexBox" v-model="item.attr_selected_vals" size="small">
              <el-checkbox :label="val" border v-for="val in Array.from(new Set(item.attr_vals.split(',')))" :key="val"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form label-position="right" label-width="140px">
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :on-success="uploadSuccess"
          :headers="setHeader"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <wangeditor :content.sync="formData.goodsIntroduce"></wangeditor>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </div>
</template>
<script>
import { getGoodsCategoryList } from '@/api/goods-category'
import { getGoodsCategoryAttr } from '@/api/goods-category-attr'
import { addGoods } from '@/api/goods'
import { getToken } from '@/utils/auth'
import wangeditor from '@/components/Editor/index.vue'
export default {
  name: 'GoodsAdd',
  components: {
    wangeditor
  },
  data () {
    return {
      active: 0,
      formData: {
        goodsName: '',
        goodsPrice: '',
        goodsWeight: '',
        goodsNumber: '',
        goodsCat: [],
        is_promote: '',
        goodsIntroduce: ''
      },
      goodsCategories: [],
      goodsCategoryAttr: [],
      checkboxGroup5: [],
      goodsCategoryParams: [],
      fileList: [],
      setHeader: {
        Authorization: getToken()
      }
    }
  },
  created () {
    this.loadGoodsCategoryList()
  },
  methods: {
    // 提交添加商品
    async handleSubmit () {
      let {
        goodsName,
        goodsCat,
        goodsPrice,
        goodsNumber,
        goodsWeight } = this.formData

      const attrs = this.getCategoryAttr()

      const pics = this.fileList.map(item => {
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname
        }
      })

      let { meta } = await addGoods({
        goodsName,
        goodsCat: goodsCat.join(','),
        goodsPrice,
        goodsNumber,
        goodsWeight,
        attrs,
        pics
      })
      if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
      if (meta.status === 400) {
        this.$message.error(`${meta.msg}`)
      }
    },
    // 获取商品种类数据列表
    async loadGoodsCategoryList () {
      let { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    // 标签页被改变事件
    handleTabChange (currentTab) {
      this.active = currentTab.index - 0
      if (currentTab.label === '商品参数' || currentTab.label === '商品属性') {
        const { goodsCat } = this.formData
        if (goodsCat.length === 0) {
          return this.$message({
            type: 'waring',
            message: '请选择商品分类'
          })
        }
      }
      switch (currentTab.label) {
        case '商品参数':
          this.loadGoodsCategoryAttr()
          break
        case '商品属性':
          this.loadGoodsCategoryParams()
          break
      }
    },
    // 获取商品分类参数列表
    async loadGoodsCategoryAttr () {
      const { goodsCat } = this.formData
      let { data, meta } = await getGoodsCategoryAttr(goodsCat[goodsCat.length - 1])
      if (meta.status === 200) {
        data.forEach(item => {
          item.attr_selected_vals = [...new Set(item.attr_vals.split(','))]
        })
        this.goodsCategoryAttr = data
      }
    },
    // 获取商品属性
    async loadGoodsCategoryParams () {
      const { goodsCat } = this.formData
      const { data, meta } = await getGoodsCategoryAttr(goodsCat[goodsCat.length - 1], 'only')
      if (meta.status === 200) {
        this.goodsCategoryParams = data
      }
    },
    getCategoryAttr () {
      const categoryAttr = this.goodsCategoryAttr.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_selected_vals.join(',')
        }
      }).filter(item => item.attr_value)
      const categoryParams = this.goodsCategoryParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      return [...categoryAttr, ...categoryParams]
    },
    uploadSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.fileList.push({
        name: file.name,
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
    }
  }
}
</script>
<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}
.flexBox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.item-row {
  margin-top: 10px;
}
</style>
