import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Financing from '@/components/Financing'
import MyFinancing from '@/components/MyFinancing'
import Running from '@/components/Running'
import store from '../store'
import {Message} from 'element-ui';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }, 
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/Financing',
      name: 'Financing',
      component: Financing,
      // meta: {
      //   tag: "logged"
      // }
    },
    {
      path: '/MyFinancing',
      name: 'MyFinancing',
      component: MyFinancing,

    },
    {
      path: '/Running',
      name: 'Running',
      component: Running,
    }
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.meta.tag !== 'selectedConference' && store.state.selectedConference) {
    store.commit('removeSelectedConference')

  }
  if (to.meta.thesis !== 'thesis' && store.state.thesisID) {
    store.commit('removeThesisID')
  }

  if (to.meta.tag !== 'admin' && store.state.admin) {
    Message({
      message: 'Administrator Model',
      type: 'warning',
      showClose: true,
      duration: 0,
    });
    //router.go(-1)
    next({path: '/ManagerAssessment',})
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    // else if(to.meta.requireAuth){
    if (store.state.token) {
      next()

    } else {
      Message({
        message: "no login information",
        type: "error",
        showClose: true,
        duration: 0,
      });
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      })
    }
  } else if (to.meta.tag === 'logged') {
    if (store.state.token) {
      //测试meta属性的添加
      //console.log(to.meta.title)
      Message({
        message: "Already logged in.",

        showClose: true,
        duration: 0,
      });
      // store.commit("logout");
      router.replace('/personalInformation')
      // next({
      //   path: '/personalInformation'
      // });
    } else {
      //console.log("no token")
      next();
    }
  } else {
    next()
  }
})
