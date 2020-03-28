<template>
    <section>
        <b-field label="Email">
            <b-input type="email"
                     value=""
                     maxlength="30">
            </b-input>
        </b-field>
        <b-field label="Password">
            <b-input type="password"
                     value=""
                     password-reveal>
            </b-input>
        </b-field>
        <b-button  type="is-success">Login</b-button>
    </section>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>