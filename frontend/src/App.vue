<template>
  <div id="app">
    <el-container>
      <el-aside width="300px" v-if="this.$store.state.token">
        <el-row>
          <el-col :span="6"
            ><img id="image" src="../src/assets/customer.jpg"
          /></el-col>
          <el-col :span="18" v-if="this.$store.state.id_number"
            ><div id="ID">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p>更换用户吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="toSetCustomer()" 
                    >确定</el-button
                  >
                </div>
                <el-button type="text" slot="reference">{{
                  this.$store.state.id_number
                }}</el-button>
              </el-popover>
            </div></el-col
          >
          <el-col :span="18" v-if="!this.$store.state.id_number"
            ><div id="ID">未输入客户</div></el-col
          >
        </el-row>

        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>贷款业务</template
            >
            <el-menu-item index="1-1" @click="route('/Action')"
              >贷款账户管理</el-menu-item
            >
            <el-menu-item index="1-2">日终结算</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-data-line"></i>账户流水</template
            >
            <el-menu-item index="2-1" @click="route('/Running')"
              >流水统计</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-star-on"></i>理财产品</template
            >
            <el-menu-item index="3-1" @click="route('/Financing')"
              >购买理财产品</el-menu-item
            >
            <el-menu-item index="3-2" @click="route('/MyFinancing')"
              >查询已购理财产品</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view />
      </el-container>
    </el-container>
    <el-footer style="text-align: center; height: 5%"
      >Copyright © 2021 FDU18SS
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    toSetCustomer(){
      
        this.$router.push('/SetCustomer');
        this.$store.commit('removeCustomer');
    
    },
    route(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style>
#ID {
  line-height: 100px;
  height: 100%;
}
#image {
  width: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
}
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
