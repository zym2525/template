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
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
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
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
    async mounted() {
      try {
        let r = await storage.load({
          key: "storageTest",
          id: `1`,
          // syncParams: { UserId: params.userId, GradeId: params.gradeId },
          autoSync: true,
          syncInBackground: true,
        });
        console.log("r: ", r);
      } catch (error) {
        console.log("error: ", error);
      }
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