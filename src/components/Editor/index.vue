<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
import { upload } from '@/api'

export default {
  name: 'editor',
  props: {
    content: String
  },
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {

  },
  mounted () {
    let editor = new E(this.$refs.editor)
    editor.customConfig.uploadImgServer = ''
    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let { data, meta } = await upload(files)
      if (meta.status === 200) {
        insert(`http://localhost:8888/${data.tmp_path}`)
      }
    }
    editor.customConfig.onchange = html => {
      this.$emit('update:content', html)
    }
    editor.create()
  }
}
</script>
<style scoped>
</style>
