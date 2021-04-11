<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>贷款业务</template
            >
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-data-line"></i>账户流水</template>
            <el-menu-item index="2-1" @click="toRunning()">流水统计</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-star-on"></i>理财产品</template
            >
            <el-menu-item index="3-1" @click="toFinancing()">购买理财产品</el-menu-item>
            <el-menu-item index="3-2" @click="toMyFinancing()">查询已购理财产品</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    toFinancing(){
      this.$router.push('/Financing');
    },
    toMyFinancing(){
      this.$router.push('/MyFinancing');
    },
    toRunning(){
      this.$router.push('/Running');
    }

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  /*margin-top: 60px;*/
}

body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.el-menu-item {
  background: #fafafa;
}
.el-container {
  height: 100%;
}
.el-aside {
  position: relative;
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: left;
  height: 100%;
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 20px;
  padding-right: 20px;
  margin-right: 20px;
}
.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  text-align: center;
}
</style>
