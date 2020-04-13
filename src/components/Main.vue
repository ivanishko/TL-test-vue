<template>
  <section class="section">
        <div class="container ">
          <h1 class="title">Posts</h1>
            <div v-if="isRole == 'reader'" class="level-right">
            Your likes: {{like}}
            </div>
            <div class="card" v-for="post in paginatedItems" :key="post.id">
              <div class="card-content">
                <div class="media-content">
                  <p class="title is-4">{{post.title}}</p>
                  <p class="subtitle is-6">{{post.userID}}</p>
                </div>
                <div class="content">
                  {{post.description}}
                  <br>
                  <time>{{post.createdAt | formatDate}}</time>
                </div>
              </div>

                <footer class="card-footer">
                    <div  class="card-footer-item" v-if="isRole == 'writer'"><router-link :to="'/edit/' + post.id"><b-button type="is-warning" icon-left="pencil">Edit</b-button></router-link></div>
                    <div  class="card-footer-item" v-if="isRole == 'writer'"><b-button type="is-danger" @click="confirmCustomDelete(post.id)" icon-left="delete">Delete</b-button></div>
                    <div  class="card-footer-item" v-if="isRole == 'reader'">
                      <b-button type="is-info"  @click="clapIt(post)" icon-left="thumb-up">
                        Clap!
                        <span>{{post.claps}}</span>
                    </b-button>
                    </div>
                </footer>

            </div>
        </div>
        <b-pagination
                :total="total"
                :current.sync="current"
                :per-page="perPage"
                :range-before="rangeBefore"
                :range-after="rangeAfter"

                :rounded="isRounded"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                >
        </b-pagination>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
    name: 'Main',
       components: {

       },
        data () {
          return {
              posts: [],
              like: +localStorage.getItem('like') || 0,

              total: this.total,
              current: 1,
              perPage: 4,
              prevIcon: 'chevron-left',
              nextIcon: 'chevron-right',
              isRounded: true,
              rangeBefore: 0,
              rangeAfter:2,
          }
        },
        computed: {
            isRole: function () {
              return this.$store.getters.isRole
            },
            claps: function (){
                return this.posts.map(el => el.claps);
            },
            paginatedItems() {
                let page_number = this.current  - 1;
                return this.posts.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
            },
            baseURL: function(){
                return this.$store.getters.baseUrl;
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
                const res = await axios.get(this.baseURL + '/posts');
                this.posts = res.data.reverse();
                this.total = this.posts.length;
            } catch(e) {
                console.error(e)
            }
        },
        methods: {
            clapIt: function(post) {
                axios.patch(this.baseURL + `/posts/` + post.id, {
                                claps: ++post.claps
                            }).then(response => {
                                post = response.data;
                                this.like += 1;
                                let index = -1;
                                this.posts.map((item, i) => {
                                    if (item.id === response.data.id) {
                                        index = i;
                                    }
                                });
                                if (index !== -1) {
                                    this.posts[index] = {
                                        ...response.data
                                    }
                                  }

                              })
                    .catch(error => {console.log(error);
                        this.$buefy.toast.open('Some error!!');
                    });
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
                await axios.delete(this.baseURL  +'/posts/' + id)
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

        },
        filters: {

            formatDate: function (d) {
                var date = new Date(d);
                let dd = date.getDate();
                if (dd < 10) dd = '0' + dd;
                let mm = date.getMonth() + 1;
                if (mm < 10) mm = '0' + mm;
                let yy = date.getFullYear() % 100;
                if (yy < 10) yy = '0' + yy;
                return dd + '.' + mm + '.' + yy;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.card {
    padding: 10px;
}
nav.pagination {
    margin: 10px 0;
}
    time {
        font-style: italic;
    }
</style>
