import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'


Vue.use(Vuex);

export const store =  new Vuex.Store({
    state: {
        status: '',
        role:'',
        user:''
    },
    mutations: {
        auth_request(state){
            state.status = 'loading';
        },
        auth_success(state, role, user){
            state.status = 'success';
            state.user = user;
            state.role = role;
        },
        auth_error(state){
            state.status = 'error';
        },
        logout(state){
            state.status = ''
            state.user = '';
            state.role = '';

        },


    },
    actions: {
          login({commit}, user) {
              return new Promise((resolve, reject) => {
                      commit('auth_request');
                      let email = user.email;
                      let password = user.password;

                      const res = axios.get(`http://localhost:3000/users/?login=` + email)
                          .then(resp => {
                              if (resp.data.length !== 0) {
                                  this.user = resp.data;

                                  let userInDB = {...this.user[0]};
                                  console.log('userInDB', userInDB);
                                  console.log('.user', userInDB.login);
                                  console.log('.password', userInDB.password);
                                  if (password == userInDB.password) {
                                      console.log('this user is autorized!');
                                      localStorage.setItem('user', userInDB.login);
                                      localStorage.setItem('role', userInDB.role);
                                      commit('auth_success', userInDB.role, userInDB.login)
                                  } else {
                                      console.log('this user did not autorized!')
                                  }
                              }
                          })
                          .catch(err => {
                              commit('auth_error', err)
                              console.log(err)
                          })
                  })
          },

        logout({commit}) {
              return new Promise((resolve, reject) => {
                      commit('logout');
                      localStorage.removeItem('user');
                      localStorage.removeItem('role');
                      resolve()
                  })
              }

          },

    getters : {
        //isLoggedIn: state => !!state.token,
        isLoggedIn: state => !!state.role,
        authStatus: state => state.status
    }

});