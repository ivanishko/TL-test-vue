<template>
  <section class="section">
        <div class="container ">
          <h1 class="title">Posts</h1>

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
                    <div  class="card-footer-item" v-if="isRole == 'writer'"><b-button type="is-danger" >Delete</b-button></div>
                    <div  class="card-footer-item" v-if="isRole == 'reader'"><b-button  @click="clapIt(post.id)" type="is-info" >Clap! {{post.claps}}</b-button></div>



                </footer>

            </div>
        </div>
  </section>
</template>

<script>
    import axios from 'axios';

    export default {
    name: 'HelloWorld',
       components: {

       },
        data () {
          return {
              posts: [],
          }
        },
        computed: {
          isRole: function () {
              return this.$store.getters.isRole
          }
        },
        async created() {
            try {
                await axios.get(`http://localhost:3000/posts`);

                this.posts = res.data;
            } catch(e) {
                console.error(e)
            }
        },
        methods: {
          clapIt(id) {
              console.log(id);
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
