import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'


Vue.use(Vuex);

const BASEURL = `http://localhost:3000`;

export const store =  new Vuex.Store({
    state: {
        status: '',
        role: localStorage.getItem('role') || '',
        userId:'',
        user: '',
        msg: ''
    },
    mutations: {
        auth_request(state){
            state.status = 'loading';
        },
        auth_success(state, user){
            state.status = 'success';
            state.role = user.role;
            state.userId = user.id;
            state.user = user.login;
            state.msg = '';
        },
        auth_error(state, msg){
            state.status = 'error';
            state.msg = msg;
        },
        logout(state){
            state.status = '';
            state.role = '';
            state.userId = '';
            state.msg = '';
        },


    },
    actions: {
          login({commit}, user) {
              return new Promise((resolve, reject) => {
                      commit('auth_request');
                      let email = user.email;
                      let password = user.password;



                      const res = axios.get(BASEURL + `/users/?login=` + email)
                          .then(resp => {
                              if (resp.data.length !== 0) {
                                  this.user = resp.data;

                                  let userInDB = {...this.user[0]};
                                  const role = userInDB.role;

                                  if (password == userInDB.password) {
                                      console.log('this user has autorized!');
                                      localStorage.setItem('role', role);
                                      commit('auth_success',userInDB);
                                      router.push('/')
                                  } else {
                                      let msg = 'Wrong  password or  login';
                                      commit('auth_error', msg)
                                      console.log('this user did not autorized!')
                                  }

                              }
                              else {
                                  let msg = 'Wrong login';
                                  commit('auth_error', msg)
                              }
                          })
                          .catch(err => {
                              commit('auth_error')
                              console.log(err)
                          })
                  })
          },

        logout({commit}) {
              return new Promise((resolve, reject) => {
                      commit('logout');
                      localStorage.removeItem('role');
                      resolve()
                  })
              }

          },

    getters : {
        isLoggedIn: state => !!state.role,
        isRole: state => state.role,
        isUser: state => state.user,
        isMsg: state => state.msg,
        userId: state => state.userId,
        authStatus: state => state.status
    }

});