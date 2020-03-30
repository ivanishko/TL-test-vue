<template>
    <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Posts
                </router-link>
            </div>
            <span v-if="!isLoggedIn" >Hello, guest</span>
            <span v-else>Hello, {{isUser}}</span>
            <div class="navbar-end">
                <div class="navbar-item">

                    <div class="buttons">
                        <router-link v-if="isRole == 'writer'" class="button is-light" to="create">
                            Create Post
                        </router-link>
                        <router-link v-if="!isLoggedIn" class="button is-light" to="login">
                            Log in
                        </router-link>
                        <button  v-if="isLoggedIn"  class="button is-dark"  @click="logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </div>
</template>

<script>

    export default {
        name: "Header",
        data(){
            return {

            }
        },
        computed : {
            isLoggedIn : function(){
                return this.$store.getters.isLoggedIn
            },
            isRole: function () {
                return this.$store.getters.isRole
            },
            isUser: function () {
                return this.$store.getters.isUser
            },
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    });

                console.log('logout!')
            }
        }
    }
</script>

<style scoped>

</style>