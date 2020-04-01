<template>
    <section>
        <b-message v-if="msg" title="Danger" type="is-danger" aria-close-label="Close message">
            {{msg}}
        </b-message>
        <b-message v-if="isMsg" title="Danger" type="is-danger" aria-close-label="Close message">
            {{isMsg}}
        </b-message>
        <b-field label="Email">
            <b-input type="email"
                     value=""
                     v-model="email"
                     placeholder="Email"
                     maxlength="30">
            </b-input>
        </b-field>
        <b-field label="Password">
            <b-input type="password"
                     value=""
                     v-model="password"
                     placeholder="Password"
                     password-reveal>
            </b-input>
        </b-field>
        <b-button  type="is-success" @click="login">Login</b-button>
    </section>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                user: {},
                msg: ''
            }
        },
        methods: {

             login: function () {
                 let email = this.email;
                 let password = this.password;
                 if (email && password) {
                     this.msg='';
                     this.$store.dispatch('login',   {email, password})
                 } else
                 {
                     this.msg = 'One or more fields are empty';
                 }


            }
        },
        computed: {
            isMsg: function () {
                return this.$store.getters.isMsg
            }
        }
    }

</script>

<style scoped>

</style>