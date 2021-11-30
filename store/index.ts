import { ActionTree, MutationTree, GetterTree} from 'vuex'
import Cells from '~/types/globa';
import shapes from '../assets/shapes'
import { leftCheck, rightCheck, downCheck ,collideCheck,downLanded } from 'assets/collisions'
import _ from 'lodash'
import rotate from '~/assets/rotation';
export const state = () => ({
   
    cells: [] as Cells[],
    currShape: [] as number[],
    column: 18,
    rows: 10,
    x: 0, 
    y: 4,
    landed: false
});
export type RootState = ReturnType<typeof state>
    
export const mutations: MutationTree<RootState> = {
    
    setField(state, cells): void {
        state.cells = cells
       
        
    },

    setCurrShape(state, currShape): void {
          state.currShape = currShape
            
            
    },
    setLanded(state,newCells) {
        const tetrCells = _.cloneDeep(state.cells); 
         const currShape = state.currShape
        let x = state.x;
        const landed = downLanded(tetrCells,currShape,x)
        if(landed) {
            state.cells = newCells
        }
        
        
        
        
    },
    incrementPosition(state,payload) {
      
     const tetrCells = _.cloneDeep(state.cells); 
    
     
     const currShape = state.currShape
        let x = state.x;
        let y = state.y;
    
        if(payload === 'ArrowLeft') {
            y--         
        } else if (payload === 'ArrowRight') {
            y++     
        } else if (payload === 'ArrowDown') {
            x++  
        }
        const passBottom = downCheck(tetrCells,currShape,x)
        if(passBottom) {
            console.log(passBottom);
            
            state.landed = true;
            return
        }
        const passLeftWall = leftCheck(y)
        if(passLeftWall) {
            return
        }
        const passRightWall = rightCheck(tetrCells,currShape,y)
        if(passRightWall) {
            return
        }
        const overlap = collideCheck(tetrCells,currShape,x,y)
        if(overlap) {
            return
        }
       
        //if(passLeftWall || passRightWall || passBottom || overlap) return
        state.y = y;
        state.x = x;
        
        
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
            const tetrCells:any = _.cloneDeep(state.cells);
            const currShape:any = state.currShape;
            let x = state.x;
            let y = state.y;
      
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
            
    },
    landed(context) {
        
        const newCells = context.getters.cells
        
        
        context.commit('setLanded',newCells)
        
    }
    
}
