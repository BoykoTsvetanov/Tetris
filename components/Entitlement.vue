<template>
    <div class="dada flex flex-col items-center" > 
         <p> Base Entitlement </p>
           <form class="form m-7 flex">

              
           <input type="text" v-model="currentCode" placeholder="Write your Product Code here..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentStartingData" placeholder="Write your Starting Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentEndingData"  placeholder="Write your Ending Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           
           <button class="btn w-1/6 hover:bg-blue-800 bg-green-500 rounded-md" v-on:click.prevent="submit"> Check your Entitlements </button>
            </form>
                 <p> Module Entitlement </p>
            <form class="form m-7 flex"> 
                 <input type="text" v-model="currentCodeModule" @change="checkInput"  :disabled="disableModel" placeholder="Write your Product Code here..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentStartingDataModule" placeholder="Write your Starting Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentEndingDataModule"  placeholder="Write your Ending Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentModelTypeModule" @change="checkInput"  :disabled="disableCode" placeholder="Write your Model Type..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <button class="btn Module w-1/6 hover:bg-blue-800 bg-green-500 rounded-md" v-on:click.prevent="submitModule"> Check your Entitlements
            </button>

           </form>
            <p> Expansion Pack </p>
                     <form class="form m-7 flex">  
            <input type="text" v-model="currentCodeExpansion" placeholder="Write your Product Code here..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentStartingDataExpansion" placeholder="Write your Starting Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <input type="text" v-model="currentEndingDataExpansion"  placeholder="Write your Ending Data..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
            <input type="number" v-model="currentQuantityExpansion"   placeholder="Write your Quantity..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
            <input type="text" v-model="currentPackageNameExpansion"  placeholder="Write your Package Name..." class="text-input relative block py-1.5 g-gray-200 rounded-md text-gray-900 border-2 border-blue-800 w-1/4" >
           <button class="btn Pack w-1/6 hover:bg-blue-800 bg-green-500 rounded-md" v-on:click.prevent="submitExpansion"> 
           Check your Entitlements
            </button>
           </form>
                    <button class="btn Pack w-1/6 hover:bg-blue-800 bg-green-500 rounded-md" v-on:click.prevent="submitApp"> 
           Check your Entitlements
            </button>
           <ul class="ulList rounded-md text-gray-900 border-2 border-blue-800 w-1/4 m-7" >
               <li class="liList relative block py-1.5 g-gray-200 text-gray-900 rounded-md m-7" v-for="(ent,index) in entitle" :key="index"  :class="styleClass(ent)">
                      
                       {{ent.text}}
                   
               </li>
           </ul>
         </div>

</template>
<script lang="ts">
import Vue from 'vue'
import { BaseEntitlement, ModelEntitlement, ExpansionPack, AppEntitlement } from 'types/globa'
import { mapGetters, mapState } from 'vuex'
export default Vue.extend ({
      computed: {
    //    ...mapState("entitlement",["disabledModel"]),
    //    ...mapState('entitlement',["disabledCode"]),
       ...mapGetters({
           entitle: "entitlement/entitle"
       })
   },
    data() {
        return {
            currentCode: '',
            currentStartingData: '',
            currentEndingData: '',
            currentCodeModule: '',
            currentStartingDataModule: '',
            currentEndingDataModule: '',
            currentModelTypeModule: '',
            currentCodeExpansion: '',
            currentStartingDataExpansion: '',
            currentEndingDataExpansion: '',
            currentQuantityExpansion: '',
            currentPackageNameExpansion: '',
            


            disableCode: false,
            disableModel: false,
        }
    },
    methods: {
        submit() {
            const productCode = this.currentCode;
            const startDate = this.currentStartingData;
            const endDate = this.currentEndingData;
            this.currentCode = '';
            this.currentStartingData = '';
            this.currentEndingData = '';
        
            this.$store.dispatch('entitlement/entitlement',{
                productCode,
                startDate,
                endDate,
            } as BaseEntitlement);
        },
        submitModule() {
            const productCode = this.currentCodeModule;
            const startDate = this.currentStartingDataModule;
            const endDate = this.currentEndingDataModule;
            const modelType = this.currentModelTypeModule

            this.currentCodeModule = '';
            this.currentStartingDataModule = '';
            this.currentEndingDataModule = '';
            this.currentModelTypeModule = '';

             this.$store.dispatch('entitlement/entitlement',{
                productCode,
                startDate,
                endDate,
                modelType,
            } as ModelEntitlement);
             this.disableCode = false;
            this.disableModel = false
        },
        submitExpansion() {
    
                 const productCode = this.currentCodeExpansion;
                 const startDate = this.currentStartingDataExpansion;
                const endDate = this.currentEndingDataExpansion;
                 const quantity = Number(this.currentQuantityExpansion);
                const packageName = this.currentPackageNameExpansion;
               
                this.$store.dispatch('entitlement/entitlement',{
                productCode,
                startDate,
                endDate,
                quantity,
                packageName
        } as ExpansionPack);
            this.currentCodeExpansion = '';
            this.currentStartingDataExpansion = '';
            this.currentEndingDataExpansion = '';
            this.currentQuantityExpansion = '';
            this.currentPackageNameExpansion = ''
        },
        submitApp() {
            const productCode = 'third'
            const startDate = '25.05.2020'
            const endDate = '30.06.2021'
            const quantity = 7;
            const packageName = 'Lol';
            const expansions = [{
                quantity: 1,
                packageName: 'Morning'
            }]
            this.$store.dispatch('entitlement/entitlement',{
                productCode,
                startDate,
                endDate,
                quantity,
                packageName,
                expansions
            } as AppEntitlement)
        },
        checkInput() {
            
                if(this.currentCodeModule.length > 0) {
                   
                     this.disableCode = true
                } else {
                    this.disableCode = false
                }
                if(this.currentModelTypeModule.length > 0) {
                    this.disableModel = true
                } else {
                    this.disableModel = false
                }
        },
       styleClass(ent:any) {
               
                if(ent.addedData) {
                 return ['text-green-600'];

             }  else if(ent.removedData) {

                 return ['text-red-600']
             }   
               else {

                 return ['text-yellow-600']
             } 
      }
    },
    
   
    
})
</script>