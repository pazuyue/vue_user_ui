<template>
  <div class="hello" >

    <img src="../assets/logo.png">
    <h1>{{ msg }}  {{message}} </h1>
  </div>

</template>

<style>
  .hello {
    text-align: center;
    padding-top: 150px;
  }
</style>


<script>



export default {
    name: 'HelloWorld',

    props: {
        'message': String,
    },
    data () {
        return {
            msg: 'Welcome to You',
        }
    },

}

</script>


