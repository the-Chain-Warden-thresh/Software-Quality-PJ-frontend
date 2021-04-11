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

      loading: false,


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

