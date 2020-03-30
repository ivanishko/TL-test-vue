<template>
    <section>
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
    import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                user: {}
            }
        },
        methods: {

             login: function () {
                 let email = this.email;
                 let password = this.password;
                 console.log(email, password);
                 this.$store.dispatch('login',   {email, password})
                        .then(() => {this.$router.push('/')})
                     .catch(err => console.log('error',err));
            }
        }
    }

</script>

<style scoped>

</style>