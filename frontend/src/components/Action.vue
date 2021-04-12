<template>
  <div id="base_action">
    <el-header style="height: 20%;padding-left: 5em;">
      <el-row style="background-color: white">
        <el-col :span="21">
          <p
            style="margin: 0;padding-top: 2%;text-align: left;background-color: white;font-size: 30px;font-weight: bold;">
            Your Personal Information</p>
          <p style="margin: 0;padding:1% 0;text-align: left;background-color: white;">Your can check <strong>your personal
            information</strong> in the following table, and you may <strong>edit some of them</strong> in our later edition.</p>
        </el-col>
        <el-col :span="3">
          <el-popover placement="bottom" v-model="visible">
            <p>Are you sure you want to log out?</p>
            <el-row style="text-align: right;margin-top:7px;">
              <el-button size="mini" @click="visible=false">No</el-button>
              <el-button type="primary" size="mini" @click="logout">Yes</el-button>
            </el-row>
            <el-button plain slot="reference" style="margin-top: 30px">
              Log out
            </el-button>
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="min-height: 70%">
      <el-collapse accordion v-model="activeName">
        <el-collapse-item name="1">
          <template slot="title">
            <h3>Personal Information&nbsp;</h3><em class="header-icon el-icon-info"></em>
          </template>
          <el-form class="personalInformation_container"
                   label-position="left"
                   label-width="0px"
                   style="margin: 20px auto">
            <h3 class="personalInformation_title">Personal Information</h3>
            <el-table
              :data="tableData"
              style="width: 800px;margin: auto">
              <el-table-column
                prop="created_time"
                label="贷款时间"
                align="center">
              </el-table-column>
              <el-table-column
              prop="payment"
              label="总贷款额（元）"
              align="center">
              </el-table-column>
              <el-table-column
                prop="repay_cycle"
                label="还款周期（天）"
                align="center">
              </el-table-column>
              <el-table-column
                prop="due_date"
                label="到期时间"
                align="center">
              </el-table-column>
              <el-table-column
                prop="next_overdue_date"
                label="下次逾期时间"
                align="center">
              </el-table-column>
              <el-table-column
                prop="left_payment"
                label="剩余还款金额（元）"
                align="center">
              </el-table-column>
              <el-table-column
                prop="left_fine"
                label="未缴罚金"
                align="center">
              </el-table-column>
              <el-table-column
              label="操作"
              align="center" width="240px">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="openDialog(scope.$index)">部分还款</el-button>
                    <el-button type="primary">全额还款</el-button>
                  </template>

              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-main>
    <el-footer style="text-align: center;height:10%;padding-top: 20px">Copyright © 2020 还没名字</el-footer>

    <el-dialog
      title="部分还款"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      >
      <el-form :model="form">

        <el-form-item label="请输入还款金额：">
          <el-input v-model="form.payment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="payPartialLoan">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Action",
      data() {
        return {
          activeName: '1',
          tableData:[{
            created_time:'2021-04-11',
            payment:500,
            repay_cycle:30,
            due_date:'2021-04-20',
            next_overdue_date:'2021-04-15',
            left_payment:150,
            left_fine:0
          },{
            created_time:'2021-04-11',
            payment:500,
            repay_cycle:30,
            due_date:'2021-04-20',
            next_overdue_date:'2021-04-15',
            left_payment:150,
            left_fine:0
          },{
            created_time:'2021-04-11',
            payment:500,
            repay_cycle:30,
            due_date:'2021-04-20',
            next_overdue_date:'2021-04-15',
            left_payment:150,
            left_fine:0
          }],
          visible:false,
          dialogVisible: false,
          form:{
            payment:''
          },
          line:0
        }
      },
      methods:{
        payPartialLoan(){
          this.dialogVisible = false;
          console.log(this.form.payment,this.line)
        },logout() {
          this.$message({
            message: 'Successful logout!',
            type: 'success'
          });
          this.$store.commit('logout');
          this.$router.replace('/login')
        },
        openDialog(index){
          this.dialogVisible = true;
          this.line=index;
        }
      }
    }
</script>

<style scoped>
  #base_action {
    background: url("../assets/background/newbackground.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .personalInformation_container {
    border-radius: 15px;
    background: #fff;
    background-clip: padding-box;
    width: 800px;
    padding: 10px 35px 0 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    height: 65%;
  }

  .el-collapse {
    border-radius: 15px;
    width: 70%;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    padding: 15px;
    background-color: white;
  }
</style>
