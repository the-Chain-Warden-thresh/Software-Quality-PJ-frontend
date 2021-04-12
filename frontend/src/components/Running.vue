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
        流水统计
      </p>

    </el-header>
  <el-main style="min-height: 70%">
      <el-table :data=tableData>
        <el-table-column
        label="操作时间"
        prop="time"
        align="center"
        sortable>

        </el-table-column>
        <el-table-column
        label="交易类型"
        prop="type"
        align="center"
        sortable>

        </el-table-column>
        <el-table-column
        label="发生额"
        prop="change"
        align="center"
        sortable>

        </el-table-column>
        <el-table-column
        label="余额"
        prop="balance"
        align="center"
        sortable>
        </el-table-column>
      </el-table>
  </el-main>

  </div>
</template>

<script>
export default {
  name: "Financing",
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  methods: {
    test(index) {
      console.log(index);
    },
  },beforeMount() {
    // 贷款记录
    this.$axios.get('/bts/loan/query_by_customer_id?customer_id='+this.$store.state.customer_id).then(resp=>{
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++){
        this.tableData.push({
          'time':resp.data[i].created_time,
          'type':'贷款',
          'change':-resp.data[i].payment,
          'balance':resp.data[i].current_deposit
        })
      }
    });
    // 存款记录
    this.$axios.get('/bts/record_query/deposit?customer_id='+this.$store.state.customer_id).then(resp=>{
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++){
        this.tableData.push({
          'time':resp.data[i].created_time,
          'type':'存款',
          'change':resp.data[i].payment,
          'balance':resp.data[i].current_deposit
        })
      }
    });
    // 还款记录
    this.$axios.get('/bts/record_query/repay?customer_id='+this.$store.state.customer_id).then(resp=> {
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++) {
        this.tableData.push({
          'time': resp.data[i].repay_time,
          'type': '还款',
          'change': -resp.data[i].repay,
          'balance': resp.data[i].current_deposit
        })
      }
    });
    // 购买理财记录
    this.$axios.get('/bts/investment/query_customer_regular_deposit_invest?customer_id='+this.$store.state.customer_id).then(resp=> {
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++) {
        this.tableData.push({
          'time': resp.data[i].purchase_date,
          'type': '购买定期理财',
          'change': -resp.data[i].purchase_amount,
          'balance': resp.data[i].current_deposit
        })
      }
    });
    // 购买基金记录
    this.$axios.get('/bts/investment/query_customer_fund_deposit_invest?customer_id='+this.$store.state.customer_id).then(resp=> {
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++) {
        this.tableData.push({
          'time': resp.data[i].purchase_date,
          'type': '购买基金',
          'change': -resp.data[i].purchase_amount,
          'balance': resp.data[i].current_deposit
        })
      }
    });
    // 购买股票记录
    this.$axios.get('/bts/investment/query_customer_stock_deposit_invest?customer_id='+this.$store.state.customer_id).then(resp=> {
      let length=resp.data.length;
      let i;
      for(i=0;i<length;i++) {
        this.tableData.push({
          'time': resp.data[i].purchase_date,
          'type': '购买股票',
          'change': -resp.data[i].purchase_amount,
          'balance': resp.data[i].current_deposit
        })
      }
    });
}
}
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

