<template>
    <div class="gameOver min-h-screen flex flex-col items-center content-center ">
        <h1 class=" head text-6xl"> GAME OVER!!! </h1>
        <button  class="btnBack rounded-full  border-4 border-solid border-green-700 w-24" v-on:click.prevent="backToPlay()">Play Again</button>
    </div>
</template>


<script>
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend ({
    
   methods: {
       backToPlay() {
           this.$store.commit('backToPlay')
           this.$store.dispatch('initField');
       }
   }


})
</script>
