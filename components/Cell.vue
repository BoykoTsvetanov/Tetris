<template>
    
    <div v-on:keyup="check($event)" tabindex="0" class="tetris-board">
                    <div class="col flex-column flex justify-content: center justify-center" v-for="(column,cellIndex) in cells" :key="cellIndex">
                   
                   <div  class="row w-8 border-solid border border-black h-8" :class="cell.color" v-for="(cell,rowIndex) in column" :key="rowIndex">
                </div>
           
               </div>


               <button class="btn" v-on:click.prevent="rotation()"><span class="bnspan">Button</span></button>
    </div>

    
</template>


<script>
import Vue from 'vue'
import { createLogger, mapGetters, mapState } from 'vuex'
export default Vue.extend ({
    
   computed: {
       ...mapState({
            columns: 'column',
            rows: 'rows',
            x: 'x',
            y: 'y'
           
        }),
        ...mapGetters(['cells'])
        
   },
 
   
   methods: {
       check(e) {
           
           const key = e.key
          
            //console.log(this.$store.state.x);
              switch (key) {
            case 37: 
            //	alert('left')
              //state.y-- 
            
            break;
            case 38:
                //alert('up');
    
                break;
            case 39:
                //alert('right');
               // state.y++
               
                break;
            case 40:
                //state.x++
                //alert('down');
                break;
    
        }
                this.$store.dispatch('keypressEvent',key)
           //this.$store.dispatch('incrementPosition',key)
           
       } ,
       rotation() {
           this.$store.commit('rotateShape')
       }
   },
     
        mounted() {
        this.$store.dispatch('initField')
        this.$store.dispatch('rotatingShape')
        
        
        
        
        //this.$store.dispatch('rotate')
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
