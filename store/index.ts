import { ActionTree, MutationTree , GetterTree} from 'vuex'
import Cells from '~/types/globa';
import switchCases  from '../assets/logic'
import textColor from '../assets/colors'
import shapes from '../assets/shapes'
import _ from 'lodash'
export const state = () => ({
   
    cells: [] as Cells[],
    column: 20,
    rows: 10,
      x: 0,
         y: 0,         
    
    
   
});
export type RootState = ReturnType<typeof state>
    
export const mutations: MutationTree<RootState> = {
    
    setField(state, cells): void {
        console.log(state);
        
     state.cells = cells;

        //state.tetramino.x++
    },
    incrementPosition(state,payload) {
        console.log(payload);
        console.log(state);
        const newY = payload.yPos;
        const newX = payload.xPos;
        const key = payload.value;
        switch (key) {
            case 37:
            //	alert('left')
                   if(state.y < 0) {
                       state.y = 0
                   } else {
                       state.y--
                   }
                break;
            case 38:
                //alert('up');
                
                break;
            case 39:
                //alert('right');
                if(state.y >8) {
                    state.y = 8
                } else {
                    state.y++
                }
                
                break;
            case 40:
                if(state.x >=18) {
                    state.x = 17
                } else {
                    state.x++
                }
               
                //alert('down');
                break;
    
        }
        
        
    }
 
}
export const getters: GetterTree<RootState,RootState> = {
    cells(state) {
            if(!state.cells.length) return []
            const occ = [];
            const random = Math.floor(Math.random()*shapes.length);
            const tShapes = shapes[random]
            
            
            const tetrCells:any = _.cloneDeep(state.cells);
            //const {x , y} = state.tetramino;
            let x = state.x;
            let y = state.y;
            

                
                for (let i = 0; i < tShapes.length; i++) {
                            
                    for (let j = 0; j < tShapes[i].length; j++) {
                        const currentShape = tShapes[i][j]
                            if(currentShape > 0) {
                                const shapeParams = {
                                    color: 'bg-red-600',
                                    isChecked: true
                                }
                            
                                    if(y < 0) {
                                        y = 0;
                                        
                                    }  else if(y > 8) {
                                            y = 8;
                                            
                                    } else {
                                        tetrCells[i+x][j+y] = shapeParams;
                                    }
                                        
                                    if(x >= 18) {
                                        x = 17;
                                        
                                    } else {
                                        tetrCells[i+x][j+y] = shapeParams;
                                    }
                                
                            }   
                    }   
                }
            // cells[i+x][j+y] = tetramino.shape[i][j]
            
                
            return tetrCells; 
        },
       
    }

export const actions: ActionTree<RootState, RootState> = {
    initField(context) {

       const cells:any[] = [];
       for (let i = 0; i < 20; i++) {
        cells[i] = [];
    
        for (let j = 0; j < 10; j++) {
            const cellsParams = {
                color: 'bg-white-600',
                isChecked: false
            }
            cells[i].push(cellsParams)
        } 
    }
     context.commit('setField', cells)
     context.getters.calc
} ,
    
}
