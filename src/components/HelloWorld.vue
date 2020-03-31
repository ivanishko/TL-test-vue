<template>
  <section class="section">
        <div class="container ">
          <h1 class="title">Posts</h1>
            <div v-if="isRole == 'reader'" class="level-right">
            Your likes: {{like}}
            </div>
            <div class="card" v-for="post of posts" :key="post.id">
              <div class="card-content">
                <div class="media-content">
                  <p class="title is-4">{{post.title}}</p>
                  <p class="subtitle is-6">{{post.userID}}</p>
                </div>
                <div class="content">
                  {{post.description}}
                  <br>
                  <time datetime="2016-1-1">{{post.createdAt}}</time>
                </div>
              </div>

                <footer class="card-footer">
                    <div  class="card-footer-item" v-if="isRole == 'writer'"><router-link :to="'/edit/' + post.id"><b-button type="is-warning" >Edit</b-button></router-link></div>
                    <div  class="card-footer-item" v-if="isRole == 'writer'"><b-button type="is-danger" @click="confirmCustomDelete(post.id)">Delete</b-button></div>
                    <div  class="card-footer-item" v-if="isRole == 'reader'"><b-button type="is-info"  @click="clapIt(post.id)">
                        Clap!
                        <span>{{claps[post.id - 1]}}</span>
                    </b-button></div>
                </footer>

            </div>
        </div>
  </section>
</template>

<script>
    const BASEURL = `http://localhost:3000`;
    import axios from 'axios';

    export default {
    name: 'HelloWorld',
       components: {

       },
        data () {
          return {
              posts: [],
              clapses: [],
              like: +localStorage.getItem('like') || 0
          }
        },
        computed: {
            isRole: function () {
              return this.$store.getters.isRole
            },
            claps: function (){
                return this.posts.map(el => el.claps);
            }

        },
        updated(){
            if (this.isRole == 'reader') {
                localStorage.setItem('like', this.like)}
            else
                {localStorage.removeItem('like')};
        },
        async created() {
            try {
               const res = await axios.get(BASEURL + `/posts`);

                this.posts = res.data;
                this.clapses = this.claps
            } catch(e) {
                console.error(e)
            }
        },
        methods: {
            clapIt: function(id) {
                axios.get(BASEURL + `/posts/` + id)
                    .then((resolve) => {
                            axios.put(BASEURL + `/posts/` + id, {
                                title: resolve.data.title,
                                description: resolve.data.description,
                                claps: ++resolve.data.claps ,
                                createdAt: resolve.data.createdAt,
                                updateAt: new Date(),
                                userId: resolve.data.userId
                                })
                        .catch(error => {console.log(error);
                        })
                }).then();
                console.log(this.clapses);
                this.clapses[id - 1] += 1;
                this.like += 1;
            },
            confirmCustomDelete(id) {
                this.$buefy.dialog.confirm({
                    title: 'Deleting post',
                    message: 'Are you sure you want to <b>delete</b> this post?',
                    confirmText: 'Delete Post',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                        this.deletePost(id);

                    }
                })
            },
            async deletePost(id) {
                await axios.delete(BASEURL +'/posts/' + id)
                    .then((resolve) => {

                        console.log('this.posts',this.posts);
                        let allPost = [...this.posts];
                        console.log('allPost',allPost);
                        this.posts = this.posts.filter(function( obj ) {
                            return obj.id !== id;
                        });
                        this.$buefy.toast.open('Post deleted!');
                    })
                    .catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .card {
    padding: 10px;
  }
</style>
