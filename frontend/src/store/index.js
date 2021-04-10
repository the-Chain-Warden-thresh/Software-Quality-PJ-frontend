import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store(
  {
  state: {
    admin:localStorage.getItem('admin') || false,
    token: localStorage.getItem('token') || null,
    username:localStorage.getItem('username')||null,
    fullName:localStorage.getItem('fullName')||null,
    email:localStorage.getItem('email'||null),
    office:localStorage.getItem('office')||null,
    region:localStorage.getItem('region')||null,
    selectedConference:JSON.parse(localStorage.getItem('selectedConference'))||null,
  //  authorities:JSON.parse(localStorage.getItem('authorities'))||null,
    conferences:JSON.parse(localStorage.getItem('conferences'))||null,
    thesisID:localStorage.getItem('thesisID')||null,
    authorities:JSON.parse(localStorage.getItem('authorities'))||null,
    information:localStorage.getItem('information')||null



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
      // localStorage.setItem('username',data.username);
      // localStorage.setItem('email',data.email);
      // localStorage.setItem('office',data.office);
      // localStorage.setItem('fullName',data.fullName);
      // localStorage.setItem('region',data.region[data.region.length-1]);
      // state.username=data.username;
      // state.email=data.email;
      // state.office=data.office;
      // state.fullName=data.fullName;
      // state.region=data.region[data.region.length-1];
      localStorage.setItem('authorities',JSON.stringify(data.authorities));
      state.authorities=data.authorities;
      localStorage.setItem('information',data.information);
      state.information=data.information;
      localStorage.setItem('username',data.username);
      state.username=data.username
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('office');
      localStorage.removeItem('admin');
      localStorage.removeItem('selectedConference');
      localStorage.removeItem('conferences');
      localStorage.removeItem('fullName');
      localStorage.removeItem('region');
      localStorage.removeItem('thesisID');
     // localStorage.removeItem('authorities');
      state.token = null;
      state.username = null;
      state.email=null;
      state.office=null;
      state.admin=false;
      state.selectedConference=null;
      state.conferences=null;
      state.region=null;
      state.fullName=null;
      state.thesisID=null;
     // state.authorities=null;
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
