<template>
  <div id="login">
    <div class="login-title">YOU递后端管理系统</div>
    <div class="login-window">
      <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('loginForm')"
            width="100%"
            class="form-submit-button"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../request/api'
import router from '../router/router.js'

export default {
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          login({
            m: 'user',
            a: 'login',
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(res => {
            if (res.status === 'SUCCESS') {
              router.push('/manage')
            } else {
              this.$message.error('账号或密码错误！')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
#login {
  height: 100%;
  width: 100%;
  background: #151f33;
  position: relative;
}

.login-title {
  height: 50px;
  width: 400px;
  margin: 0 auto;
  padding-top: 160px;
  color: #ffffff;
  font-size: 30px;
  text-align: center;
}
.login-window {
  height: 250px;
  width: 400px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.login-form {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  margin-top: 40px;
}
.form-submit-button {
  width: 100%;
}
</style>
