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
        当前信用评级: {{ this.creditLevel }}
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
        <el-table :data="myFtfp" border style="width: 100%">
          <el-table-column prop="regular_deposit_id" label="基金代号">
          </el-table-column>
          <el-table-column prop="due_date" label="到期时间"> </el-table-column>
          <el-table-column prop="expecting_profit" label="预计收益" width="180">
          </el-table-column>
          <el-table-column prop="purchase_amount" label="购买金额">
          </el-table-column>
          <el-table-column prop="purchase_date" label="买入时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基金" name="foundation">
        <el-table :data="myFoundation" border style="width: 100%">
          <el-table-column prop="fund_id" label="基金代号" width="180">
          </el-table-column>
           <el-table-column prop="due_date" label="到期时间"> </el-table-column>
          <el-table-column prop="position_share" label="持仓份额" width="180">
          </el-table-column>
          <el-table-column prop="purchase_amount" label="累计买入金额"> </el-table-column>
          
         
          <el-table-column prop="purchase_date" label="买入时间"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="股票" name="shares">
        <el-table :data="myShares" border style="width: 100%">
          <el-table-column prop="stock_id" label="股票代号"> </el-table-column>
          <el-table-column prop="current_profit" label="当前利润">
          </el-table-column>
          <el-table-column
            prop="cumulative_purchase_amount"
            label="累计买入金额"
          ></el-table-column>

          <el-table-column prop="position_share" label="持仓股数">
          </el-table-column>
          <el-table-column prop="purchase_date" label="买入时间">
          </el-table-column>
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
      creditLevel: [],
      activeName: "ftfp",
      myFtfp: [],
      myFoundation: [],
      myShares: [],

    };
  },
  beforeMount() {
    var myDate = new Date();
    var date;
    date =
      myDate.getFullYear() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getDate();
    this.$axios
      .get(
        "/bts/investment/get_customer_credit?customer_id=" +
          this.$store.state.customer_id
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.creditLevel = resp.data.credit_level;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.$axios
      .get(
        "/bts/investment/query_customer_regular_deposit_invest?customer_id=" +
          this.$store.state.customer_id
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.myFtfp = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.$axios
      .get(
        "/bts/investment/query_customer_fund_invest?customer_id=" +
          this.$store.state.customer_id +
          "&query_date=" +
          date
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.myFoundation = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.$axios
      .get(
        "/bts/investment/query_customer_stock_invest?customer_id=" +
          this.$store.state.customer_id +
          "&query_date=" +
          date
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.myShares = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
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

