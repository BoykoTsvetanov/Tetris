<template>
  <div  class="row w-8 border-solid border border-black h-8" :class="color"  />
</template>


<script>
import Vue from 'vue'

export default Vue.extend ({
    props: {
      color: String,
      isChecked: Boolean
    }
})
</script>