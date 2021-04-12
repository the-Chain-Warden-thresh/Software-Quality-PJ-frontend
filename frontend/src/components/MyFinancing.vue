<template>
  <div id="base_login">
    <el-header style="height: 20%; padding-left: 5em">
      <p
        style="
          margin: 0;
          padding-top: 2%;
          text-align: left;
          background-color: white;
          font-size: 30px;
          font-weight: bold;
        "
      >
        理财产品查询
      </p>
      <p
        style="
          margin: 0;
          padding-top: 3%;
          padding-bottom: 1%;
          text-align: left;
          background-color: white;
          font-size: 18px;
        "
      >
        当前信用评级
      </p>
      <p
        style="
          margin: 0;
          padding: 0 0px;
          text-align: left;
          background-color: white;
          color: red;
          font-size: 14px;
        "
      >
        *三级账户只能购买定期理财产品，二级账户还可以购买基金，一级账户可以购买所有产品
      </p>
    </el-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="定期理财产品" name="ftfp">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基金" name="foundation">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="股票" name="shares">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Financing",
  data() {
    return {
      loading: false,
      activeName: "ftfp",
      myFtfp: [],
      myFoundation: [],
      myShares: [],
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
  beforeMount() {
    this.$axios
      .get(
        "/bts/investment/get_customer_credit?customer_id=" +
          this.$store.state.customer_id
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp);
        }
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "error",
          showClose: true,
          duration: 0,
        });
      });
  },
  methods: {
    test(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
#base_login {
  margin-left: 5%;
  margin-right: 5%;
  height: 100%;
  width: 65%;
  min-width: 800px;
  background-size: cover;
  position: fixed;
}
</style>

