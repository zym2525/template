<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: "请账号", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          ],
          password: [{ required: true, message: "请用户密码", trigger: "blur" }],
        },
      };
    },
    methods: {
      login() {
        this.$refs.form.validate((valid) => {
          if (valid) {
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 600px;
  }
</style>