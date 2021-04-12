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
        理财产品购买
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
        <el-table :data="ftfp" border style="width: 100%">
          <el-table-column
            prop="regular_deposit_id"
            label="产品代号"
          ></el-table-column>
          <el-table-column prop="regular_deposit_name" label="产品名称">
          </el-table-column>
          <el-table-column prop="issue_date" label="发行日期">
          </el-table-column>
          <el-table-column prop="return_cycle" label="周期（天）">
          </el-table-column>
          <el-table-column prop="return_rate" label="利率"> </el-table-column>
          <el-table-column  label="购买金额" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="ftfpAmount[props.$index]"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="100px" fixed="right">
            <template slot-scope="props">
              <el-popconfirm
                title="确定购买吗？"
                icon="el-icon-s-goods"
                @onConfirm="buyFtfp(props.$index)"
              >
                <el-button slot="reference" :disabled="!ftfpAmount[props.$index]"
                  >购买</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基金" name="foundation" v-if="this.creditLevel <= 2">
        <el-table :data="foundation" border style="width: 100%">
          <el-table-column prop="fund_id" label="基金代号"> </el-table-column>
          <el-table-column prop="fund_name" label="基金名称"> </el-table-column>
          <el-table-column prop="issue_date" label="发行日期">
          </el-table-column>
          <el-table-column prop="issue_price" label="发行价格">
          </el-table-column>
          <el-table-column label="购买时长（天）" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="foundationNum[props.$index]"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="购买金额" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="foundationAmount[props.$index]"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="100px" fixed="right">
            <template slot-scope="props">
              <el-popconfirm
                title="确定购买吗？"
                icon="el-icon-s-goods"
                @onConfirm="buyFoundation(props.$index)"
              >
                <el-button
                  slot="reference"
                  :disabled="!foundationNum[props.$index]||!foundationAmount[props.$index]"
                  >购买</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="股票" name="shares" v-if="this.creditLevel == 1">
        <el-table :data="shares" border style="width: 100%">
          <el-table-column prop="stock_id" label="股票代号"> </el-table-column>
          <el-table-column prop="stock_name" label="股票名称">
          </el-table-column>
          <el-table-column prop="issue_date" label="发行日期">
          </el-table-column>
          <el-table-column prop="issue_price" label="发行价格">
          </el-table-column>
          <el-table-column  label="购买股数" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="sharesNum[props.$index]"
              ></el-input-number> </template
          ></el-table-column>
          <el-table-column width="100px" fixed="right">
            <template slot-scope="props">
              <el-popconfirm
                title="确定购买吗？"
                icon="el-icon-s-goods"
                @onConfirm="buyShares(props.$index)"
              >
                <el-button slot="reference" :disabled="!sharesNum[props.$index]"
                  >购买</el-button
                >
              </el-popconfirm>
            </template>
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
      ftfpAmount:[],
      foundationAmount: [],
      creditLevel: [],
      date: [],
      dialogVisible: false,
      ftfpNum: [],
      foundationNum: [],
      sharesNum: [],
      loading: false,
      activeName: "ftfp",
      ftfp: [],
      foundation: [],
      shares: [],
    };
  },
  beforeMount() {
    var myDate = new Date();
    this.date =
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
      .get("/bts/market/query_funds?product_id=" + -1)
      .then((resp) => {
        if (resp.status === 200) {
          this.foundation = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.$axios
      .get("/bts/market/query_stocks?product_id=" + -1)
      .then((resp) => {
        if (resp.status === 200) {
          this.shares = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.$axios
      .get("/bts/market/query_regular_deposits?product_id=" + -1)
      .then((resp) => {
        if (resp.status === 200) {
          this.ftfp = resp.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    buyFtfp(index) {
      this.$axios
        .post("/bts/investment/buy_regular_deposit", {
          customer_id: this.$store.state.customer_id,
          regular_deposit_id: this.ftfp[index].regular_deposit_id,
          purchase_amount: this.ftfpAmount[index],
          purchase_date: this.date,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({
              message: "购买成功!",
              type: "success",
            });
            location.reload();
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
    buyFoundation(index) {
      this.$axios
        .post("/bts/investment/buy_fund", {
          customer_id: this.$store.state.customer_id,
          fund_id: this.foundation[index].fund_id,
          purchase_amount: this.foundationAmount[index],
          purchase_date: this.date,
          return_cycle: this.foundationNum[index]
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({
              message: "购买成功!",
              type: "success",
            });
            location.reload();
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
    buyShares(index) {
      this.$axios
        .post("/bts/investment/buy_stock", {
          customer_id: this.$store.state.customer_id,
          stock_id: this.shares[index].stock_id,
          new_position_share: this.sharesNum[index],
          purchase_date: this.date,
        })
        .then((resp) => {
          if (resp.status === 200) {
            this.$message({
              message: "购买成功!",
              type: "success",
            });
            location.reload();
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

