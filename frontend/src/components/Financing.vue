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
          <el-table-column prop="address" label="购买时长(天)" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="ftfpNum[props.$index]"
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
                <el-button slot="reference" :disabled="!ftfpNum[props.$index]"
                  >购买</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基金" name="foundation">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="购买时长(天)" width="180">
            <template slot-scope="props">
              <el-input-number
                size="small"
                :min="0"
                placeholder="0"
                v-model="foundationNum[props.$index]"
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
              <el-button slot="reference"
               
                :disabled="!foundationNum[props.$index]"
                >购买</el-button
              >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="股票" name="shares">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="购买股数" width="180">
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
              <el-button slot="reference"
               
                :disabled="!sharesNum[props.$index]"
                >购买</el-button
              >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-footer style="text-align: center; height: 5%"
      >Copyright © 2021
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "Financing",
  data() {
    return {
      dialogVisible: false,
      ftfpNum: [],
      foundationNum: [],
      sharesNum: [],
      loading: false,
      activeName: "ftfp",
      ftfp: [],
      foundation: [],
      shares: [],
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
  methods: {
    test(index) {
      console.log(index);
    },
    buyFtfp(index) {
      console.log(this.ftfpNum[index]);
    },
    buyFoundation(index) {
      console.log(this.foundationNum[index]);
    },
    buyShares(index) {
      console.log(this.sharesNum[index]);
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

