<template>
    
    <div v-on:keyup="check($event)" tabindex="0" class="tetris-board">
                    <div class="col flex-column flex justify-content: center justify-center" v-for="(column,cellIndex) in cells" :key="cellIndex">
                   
                   <div  class="row w-8 border-solid border border-black h-8" :class="cell.color" v-for="(cell,rowIndex) in column" :key="rowIndex">
                </div>
           
               </div>
    </div>
</template>


<script>
import textColor from '../assets/colors'
import Vue from 'vue'
import { createLogger, mapGetters, mapState } from 'vuex'
export default Vue.extend ({
    
   computed: {
       ...mapState({
            columns: 'column',
            rows: 'rows',
        }),
        ...mapGetters(['cells'])
        
   },
   data() {
       return {
           xNewPosition:0,
           yNewPosition: 0,
           key:0
       }
   },
     
   
   methods: {
       
       check(e) {
           const key = e.keyCode
         
           //console.log(e.keyCode);
           this.xNewPosition++;
           this.yNewPosition++;
           this.key = key;
           
           this.$store.commit({
               type: 'incrementPosition',
               value: this.key,
               xPos:this.xNewPosition,
               yPos:this.yNewPosition
           })
           //this.$forceUpdate();
           //switchCases(e.keyCode)
       } 
   },
     
        mounted() {
        this.$store.dispatch('initField')
        
        
        //this.$store.dispatch('rotate')
    }

})
</script>
