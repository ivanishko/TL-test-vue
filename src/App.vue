<template>
  <div id="app">
    <div class="container">
      <div class="column is-three-fifths is-offset-one-fifth">
        <Header/>
        <router-view/>
        <Footer/>
      </div>

    </div>

  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
