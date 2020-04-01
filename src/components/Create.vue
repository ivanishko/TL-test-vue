<template>
    <div>
            <b-field label="Title">
                <b-input v-model="title"></b-input>
            </b-field>
            <b-field label="Post">
                <b-input maxlength="200" type="textarea" v-model="body"></b-input>
            </b-field>
            <b-button type="is-primary" @click="addPost">Add</b-button>

    </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: "Create",
        data(){
          return {
              title: '',
              body: ''
          }
        },

        methods: {
            async addPost() {
                await axios.post(this.baseURL + '/posts', {
                    title: this.title,
                    description: this.body,
                    createdAt: new Date(),
                    updateAt: new Date(),
                    userId: this.$store.getters.userId,
                    claps: 0
                })
                    .then(() => this.$router.push('/'))
                ;


                this.title = '';
                this.body = '';
            }
        },
        computed: {
            baseURL: function(){
                return this.$store.getters.baseUrl;
            }
        }
    }
</script>

<style scoped>

</style>