<template>
  <div  v-on:keyup="check($event)" tabindex="0" class="tetris-board">
      <div class="col flex-column flex justify-content: center justify-center" v-for="(column,cellIndex) in cells" :key="cellIndex">
          <!-- <div  class="row w-8 border-solid border border-black h-8" :class="cell.color" v-for="(cell,rowIndex) in column" :key="rowIndex" /> -->
          <Cell v-for="(cell,rowIndex) in column" :key="`${cellIndex}-${rowIndex}`" v-bind="cell" />
      </div>
    <button class="btn" v-on:click.prevent="rotation()"><span class="bnspan">Button</span></button>     
  </div>
</template>


<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
export default Vue.extend ({
    computed: {
        ...mapGetters(['cells'])
    },

   methods: {
       check(e) {
              
      const key = e.key
      this.$store.dispatch('keypressEvent',key)
      
           
       } ,
       
    rotation() {
      this.$store.dispatch('checkRotation')
      
       },
   },
    
    mounted() {
          
    this.$store.dispatch('initField')
    this.$store.dispatch('creatingPiece')
    this.$store.dispatch('findingLines')
  
        
    
    }

})
</script>

<style scoped>
    .btn {
    background-image: linear-gradient(135deg, #008aff, #86d472);
  border-radius: 6px;
  box-sizing: border-box;
  color: #ffffff;
  display: block;
  height: 50px;
  font-size: 1.4em;
  font-weight: 600;
  padding: 4px;
  position: relative;
  text-decoration: none;
  width: 7em;
  margin: 0 auto
    }
    .bnspan:hover {
  color: #fff;
}
.btn .bnspan {
     align-items: center;
  background: #0e0e10;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  height: 100%;
  transition:  0.5s ease;
  width: 100%;
}
.btn .bnspan {
     background: transparent;
}
</style>
