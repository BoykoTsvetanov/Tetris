<template>
    <in-play v-if="!gameOver" />
    <game-over v-else/>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend ({
   computed: {
       ...mapState(['gameOver'])
   }
})
</script>
