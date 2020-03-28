<template>
    <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    Posts
                </a>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-light" href="/#/create/">
                            Create Post
                        </a>
                        <a class="button is-light" href="/#/login">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>