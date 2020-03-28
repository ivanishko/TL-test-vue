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


                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>

            </div>
        </div>
  </section>
</template>

<script>
    import axios from 'axios';

    export default {
  name: 'HelloWorld',
        data () {
          return {
              posts: [],
          }
        },
        async created() {
            try {
                const res = await axios.get(`http://localhost:3000/posts`)

                this.posts = res.data;
            } catch(e) {
                console.error(e)
            }
        },
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
</style>
