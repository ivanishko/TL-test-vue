<template>
    <div>
        <b-field label="Title">
            <b-input v-model="title" :value="title"></b-input>
        </b-field>
        <b-field label="Post">
            <b-input maxlength="2000"  :value="body" type="textarea" v-model="body"></b-input>
        </b-field>
        <b-button type="is-primary" @click="editThis">Save</b-button>
    </div>
</template>

<script>
    import axios from 'axios';

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
            baseUrl:function(){
                return this.$store.getters.baseUrl;
            }
        },
        created() {
            axios.get(this.baseUrl + `/posts/` + this.id)
                .then(resp => {
                    console.log('post',resp.data);
                    this.title = resp.data.title;
                    this.body = resp.data.description;
                });
        },
        methods: {
            editThis: function() {
                axios.patch(this.baseUrl  + `/posts/` + this.id, {
                    title: this.title,
                    description: this.body,
                    updateAt: new Date(),
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
