<template>
  <div class="body">
    <div class="login-box">
      <!--head-->
      <div class="py-container logoArea">
        <a href="#" class="logo"></a>
        <h2 class="big">品优购后台管理系统</h2>
      </div>
      <!--loginArea-->
      <div class="loginArea">
        <div class="py-container login">
          <div class="loginform">
            <ul class="sui-nav nav-tabs tab-wraped">
              <li>
                <a href="#index" data-toggle="tab">扫描登录</a>
              </li>
              <li class="active">
                <a href="#profile" data-toggle="tab">账户登录</a>
              </li>
            </ul>
            <div class="tab-content tab-wraped">
              <div id="index" class="tab-pane">
                <p>啦啦啦</p>
              </div>
              <div id="profile" class="tab-pane active">
                <div class="login-body">
                  <el-form
                    label-position="top"
                    label-width="80px"
                    :model="loginForm"
                    ref="loginFormOk"
                    :rules="loginFormRule"
                  >
                    <el-form-item prop="username">
                      <el-input v-model="loginForm.username" placeholder="用户名/邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="login-btn" type="primary" @click.prevent="validateForm">登录</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="registration">
                  <ul>
                    <li>
                      <a href="#"></a>
                    </li>
                    <li>
                      <a href="#"></a>
                    </li>
                    <li>
                      <a href="#"></a>
                    </li>
                    <li>
                      <a href="#"></a>
                    </li>
                  </ul>
                  <a href="register.html">立即注册</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--foot-->
      <div class="py-container copyright">
        <ul>
          <li>
            <a href="#">关于我们</a>
          </li>
          <li>
            <a href="#">联系我们</a>
          </li>
          <li>
            <a href="#">联系客服</a>
          </li>
          <li>
            <a href="#">商家入驻</a>
          </li>
          <li>
            <a href="#">营销中心</a>
          </li>
          <li>
            <a href="#">手机品优购</a>
          </li>
          <li>
            <a href="#">销售联盟</a>
          </li>
          <li>
            <a href="#">品优购社区</a>
          </li>
          <li>
            <a href="#">品优购公益</a>
          </li>
          <li>
            <a href="#">English Site</a>
          </li>
          <li>
            <a href="#">Contact U</a>
          </li>
        </ul>
        <div class="address">地址：中国北京市朝阳区大望路西大望路1号 邮编：100096 电话：400-618-4000 传真：010-82935100</div>
        <div class="beian">京ICP备08001421号京公网安备110108007702</div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
import { setToken } from '@/utils/auth.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateForm () {
      this.$refs.loginFormOk.validate(valid => {
        if (valid) { // 验证通过，提交表单
          this.toLogin()
        } else {
          return false
        }
      })
    },
    async toLogin () {
      let { data } = await login(this.loginForm)
      if (data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        setToken(data.data.token)
        this.$router.replace('/')
      } else {
        this.$message.error(`登录失败：${data.meta.msg}`)
      }
    }
  }

}
</script>

<style>
@import "./styles/common.css";
@import "./styles/page-account.css";
.login-btn {
  width: 100%;
}
.login-body {
  padding: 10px;
}
</style>
