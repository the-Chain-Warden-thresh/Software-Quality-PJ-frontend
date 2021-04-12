import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store(
  {
  state: {
    token: localStorage.getItem('token') || null,
    username:localStorage.getItem('username')||null,
    ID: localStorage.getItem('ID')||null,

  //  authorities:JSON.parse(localStorage.getItem('authorities'))||null,




    //测试拦截的预设token
    // token:1,
    // userDetails:2
  },
  mutations: {
    //测试拦截的预设login
    // login(state){
    //   state.userDetails+=1
    //   state.token+=1
    //     },
    login(state, data){
      localStorage.setItem('token', data.token);
      state.token = data.token
    },
    setUserDetails(state,data){
  
      localStorage.setItem('username',data.username);
      state.username=data.username
    },
    setCustomer(state,data){
      localStorage.setItem('ID', data.ID);
      state.ID = data.ID;
    },
    removeCustomer(state){
      localStorage.removeItem('ID');
      state.ID=null;
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('ID');
      state.ID=null;
      state.token = null;
      state.username = null;
    },
    //type:String  chair:1  PC:2 author:3 contribution:4
    setSelectedConference(state,data){
     var tep={conference:data.conference,type:data.type};
    localStorage.setItem('selectedConference',JSON.stringify(tep));
      state.selectedConference=tep;
    },
    removeSelectedConference(state){
      localStorage.removeItem('selectedConference');
      state.selectedConference=null;
    },
    setConferences(state,data){
      state.conferences=data;
      localStorage.setItem('conferences',JSON.stringify(data));
    },
    removeConferences(state){
      state.conferences=null;
      localStorage.removeItem('conferences');
    },
    setAdmin(state){
      localStorage.setItem('admin',true)
      state.admin=true;
    },
    setThesisID(state,data){
      localStorage.setItem('thesisID',data);
      state.thesisID=data;
    },
    removeThesisID(state){
      state.thesisID=null;
      localStorage.removeItem('thesisID');
    }
    // setAuthorities(state,data){
    //   state.authorities=data.authorities;
    //   localStorage.setItem('authorities',JSON.stringify(data.authorities));
    // },
    // removeAuthorities(state){
    //   state.authorities=null;
    //   localStorage.removeItem('authorities');
    // },

    // removeAdmin(state){
    //   localStorage.removeItem('admin');
    //   state.admin=false;
    // },



    //测试拦截的logout
    // logout(state){
    // state.userDetails=null
    // state.token=null
    // }
  },
  actions: {
  }
})
