<template>
    <div> <h1> ddddd </h1> </div>
</template>



<script>
import Vue from 'vue'

export default Vue.extend ({
    
    mounted() {
        this.$store.dispatch('entitlement')
    }
    
})
</script>