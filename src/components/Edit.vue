<template>
    <div>

        {{id}}
        <b-field label="Title">
            <b-input v-model="title" :value="title"></b-input>
        </b-field>
        <b-field label="Post">
            <b-input maxlength="200"  :value="body" type="textarea" v-model="body"></b-input>
        </b-field>
        <b-button type="is-primary" @click="editThis">Save</b-button>
    </div>
</template>

<script>
    import axios from 'axios';
    const BASEURL = `http://localhost:3000`;

    export default {
        name: "Edit",
        data(){
            return {
                title: '',
                body: '',
                createdAt: '',
                claps: '',
                updateAt: '',
                userId: '',

            }

        },
        computed: {
            id: function(){
                return this.$route.params.id;
            },


        },
        created() {
            axios.get(BASEURL + `/posts/` + this.id)
                .then(resp => {
                    console.log('post',resp.data);
                    this.title = resp.data.title;
                    this.body = resp.data.description;
                    this.claps = resp.data.claps;
                    this.createdAt = resp.data.createdAt;
                    this.updateAt = resp.data.updateAt;
                    this.userId = resp.data.userId;
                });
        },
        methods: {
            editThis: function() {
                axios.put(BASEURL + `/posts/` + this.id, {
                    title: this.title,
                    description: this.body,
                    claps: this.claps,
                    createdAt: this.createdAt,
                    updateAt: new Date(),
                    userId: this.userId
                })
                    .then(() => this.$router.push('/'))
                    .catch(error => {console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>