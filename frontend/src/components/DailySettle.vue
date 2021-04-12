<template>
  <div id="base_login">
    <el-form
      :model="customerForm"
      :rules="rules"
      class="login_container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
      :ref="customerForm"
    >
      <h3 class="login_title" style="margin-top: 50px;margin-bottom: 20px">开始日终处理</h3>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="
            width: 300px;
            background: dodgerblue;
            border-radius: 4px;
            height: 40px;
          "
          v-on:click="settle"
        >确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "DailySettle",
    data() {
      const dataValid = (rule, value, callback) => {
        if (!value || value === "") {
          return callback(new Error("Can't be empty"));
        }

        return callback();
      };
      return {
        customerForm: {
          ID: "",
        },
        rules: {
          ID: [
            { required: true, message: "", trigger: "blur" },
            { validator: dataValid, trigger: "blur" },
          ],
        },
        loading: false,
      };
    },
    methods: {
      settle(){
        this.$axios.get('/bts/loan/auto_repay').then(resp=>{
          this.$message({
                      message: "日终处理完成！",
                      type: "success",
                    });
        })
      }
      // set(customerForm) {
      //   this.$axios
      //     .get("/bts/customer/query_by_id_number?id_number="+customerForm.ID)
      //     .then((resp) => {
      //       console.log(resp);
      //       if (resp.status === 200) {
      //         this.$message({
      //           message: "客户身份确认",
      //           type: "success",
      //         });
      //         this.$store.commit("setCustomer", resp.data);
      //         this.$router.push("/Action");
      //       }
      //     })
      //     .catch((error) => {
      //       this.$message({
      //         message: error,
      //         type: "error",
      //         showClose: true,
      //         duration: 0,
      //       });
      //     });
      // },
    },
  };
</script>

<style scoped>
  #base_login {
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  p {
    margin: 0;
  }

  body {
    margin: 0px;
    padding: 0px;
  }

  .input {
    width: 350px;
    padding: 0;
  }

  .login_container {
    border-radius: 15px;
    background: #fff;
    background-clip: padding-box;
    margin: 10% 30% 10% 15%;
    width: 30%;
    padding: 10px 35px 0 35px;
    border: 1px solid #eaeaea;
    height: 30%;
  }

  .login_title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #505458;
  }

  input {
    width: 300px;
    height: 24px;
    border: 2px solid #ccc;
    border-radius: 4px;
  }
</style>

