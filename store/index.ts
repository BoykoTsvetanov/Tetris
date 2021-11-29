import { ActionTree, MutationTree , GetterTree} from 'vuex'
import Cells from '~/types/globa';
import shapes from '../assets/shapes'
import collisions from 'assets/collisions'
import _ from 'lodash'
import rotate from '~/assets/rotation';
export const state = () => ({
   
    cells: [] as Cells[],
    currShape: [] as number[],
    column: 18,
    rows: 10,
    x: 0,
    y: 4,
});
export type RootState = ReturnType<typeof state>
    
export const mutations: MutationTree<RootState> = {
    
    setField(state, cells): void {
        state.cells = cells

    },

    setCurrShape(state, currShape): void {
          state.currShape = currShape
    },

    incrementPosition(state,payload) {
        const tetrCells = _.cloneDeep(state.cells);
        const currShape = state.currShape
        const pass = false;
 
           
            
        if(payload === 'ArrowLeft') {
            state.y--;
        }else if (payload === 'ArrowRight') {
            state.y++
        } else if (payload === 'ArrowDown') {
            state.x++
        }
        
        

    },
    rotateShape(state) {
        const currShape:any = _.cloneDeep(state.currShape);
        const rotation = rotate(currShape);
        state.currShape = rotation as any
    }
 
}
export const getters: GetterTree<RootState,RootState> = {
    cells(state) {
            if(!state.cells.length) return []
            const pass = true
         
            const tetrCells:any = _.cloneDeep(state.cells);
            const currShape:any = state.currShape;
           
            let x = state.x;
            let y = state.y;
            collisions(tetrCells,currShape,x,y, pass)
       
                for (let i = 0; i < currShape.length; i++) {
                            
                    for (let j = 0; j < currShape[i].length; j++) {
                        const currentShape = currShape[i][j]
                            if(currentShape > 0) {
                                const shapeParams = {
                                    color: 'bg-red-600',
                                    isChecked: true
                                }
                                    tetrCells[i+x][j+y] = shapeParams;
                              
                                
                            }   
                    }   
                }
       
            return tetrCells; 
        },
       
    }

export const actions: ActionTree<RootState, RootState> = {
    initField(context) {        
            
       const cells:any[] = [];
    
       for (let i = 0; i <= context.state.column; i++) {
            cells[i] = [];
            
            for (let j = 0; j <= context.state.rows; j++) {
                const cellsParams = {
                    color: 'bg-white-600',
                    isChecked: false
                }
                cells[i].push(cellsParams)
            
            } 
        }
        cells[7][4] = {
            color: 'bg-green-600',
            isChecked: true
        }
    
        context.commit('setField', cells)

        

} ,
    rotatingShape(context) {
        const random = Math.floor(Math.random()*shapes.length);
        const currShape = shapes[random]
        context.commit('setCurrShape', currShape)
    },
    keypressEvent(context,payload) {
          context.commit('incrementPosition',payload)
            
    }
    
}
