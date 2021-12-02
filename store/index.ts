import { ActionTree, MutationTree, GetterTree} from 'vuex'
import Cells from '~/types/globa';
import shapes from '../assets/shapes'
import { leftCheck, rightCheck, downCheck ,collideCheck, rotateShapeRight, rotateShapeCollide, landedOnTopOfShape } from 'assets/collisions'
import _ from 'lodash'
import rotate from '~/assets/rotation';
export const state = () => ({
   
    cells: [] as Cells[],
    currShape: [] as number[],
    column: 18,
    rows: 10,
    x: 0, 
    y: 4,
    landed: false,
    generateShape: [] as number[]
});
export type RootState = ReturnType<typeof state>
    
export const mutations: MutationTree<RootState> = {
    
    setField(state, cells): void {
        state.cells = cells
    },

    setCurrShape(state, currShape): void {
          state.currShape = currShape
            
    },
    
    updatePosition(state, {x, y}): void {
        state.x = x
        state.y = y
          
  },
    removeLines(state,payload) {
        state.cells = payload;
    
    },
    rotateShape(state,rotation) {
       
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
         
        context.commit('setField', cells)
} ,
    creatingPiece(context) {
        const random = Math.floor(Math.random()*shapes.length);
        const currShape = shapes[random]
        context.commit('setCurrShape', currShape);

    },

    keypressEvent({state, commit, dispatch},keyPressed) {
        
         const tetrCells = state.cells
         const currShape = state.currShape
            let x = state.x;
            let y = state.y;
            
            if(keyPressed === 'ArrowLeft') {
                y--         
            } else if (keyPressed === 'ArrowRight') {
                y++     
            } else if (keyPressed === 'ArrowDown') {
                x++  
            }

            const passBottom = downCheck(tetrCells,currShape,x)
            if(passBottom) {
                dispatch('landed')
                return
            }
           
            const passLeftWall = leftCheck(y)
            if(passLeftWall) return
            const passRightWall = rightCheck(tetrCells,currShape,y)
            if(passRightWall) return
            const landedOfTopShape = landedOnTopOfShape(tetrCells,currShape,x,y,keyPressed);
                if(landedOfTopShape) {
                    dispatch('landed');
                    return
                } 
            const overlap = collideCheck(tetrCells,currShape,x,y)
            if(overlap) return
              
            //if(passLeftWall || passRightWall || passBottom || overlap) return
            commit('updatePosition', {x,y})
            // state.y = y;
            // state.x = x;

            
    },
    landed(context) {
     
        const freezePiece = _.cloneDeep(context.getters.cells);
        const currentShape:any = context.state.currShape;
        const x = context.state.x;
        const y = context.state.y;
  
            for (let i = 0; i < currentShape.length; i++) {
                
                for (let j = 0; j < currentShape[i].length; j++) {
                    
                    if(currentShape[i][j] > 0) {
                        const shapeParams = {
                            color: 'bg-green-500',
                            isChecked: true
                        }
                        freezePiece[i + x][j + y] = shapeParams;
                    }
                    
                }
                
            }
        context.commit('setField',freezePiece)
        context.commit('setCurrShape', [])
        context.commit('updatePosition', {x: 0, y: 4})
        context.dispatch('creatingPiece')
        context.dispatch('findingLines')
    },
    checkRotation({state, commit}) {
     
        const currShape:any = state.currShape
        const tetrCells = state.cells;
        const y = state.y;
        const x = state.x;
        const rotation = rotate(currShape);
        const isRotateRightAllowed = rotateShapeRight(tetrCells,rotation,y)
        if(isRotateRightAllowed) return
        const isRotateOverlapAllowed = rotateShapeCollide(tetrCells,rotation,x,y);
        if(isRotateOverlapAllowed) return
        commit('rotateShape',rotation)
        
    },
    findingLines({state, dispatch}) {
            const line:any = _.cloneDeep(state.cells);
            let clearLine:number[] = [];
            line.reduce((acc:[object],row:number[]) => {
            let filtered = row.filter((x:any) => x.isChecked);
            const indexOf = line.indexOf(row);
            filtered.length === row.length ? acc.push({indexToClear:indexOf}) : [];
            return acc
           },
           clearLine
           );

           dispatch('clearLines',clearLine);
    
    },
    clearLines({ state, commit },clearLine) {
               
                const tetrCells:any = _.cloneDeep(state.cells);
              
                clearLine.forEach((x:any) => {
                const index = x.indexToClear;
                tetrCells.splice(index,1);
                tetrCells.unshift(new Array(tetrCells[0].length).fill({color: 'bg-white-600',isChecked:false}))
            })
              commit('removeLines',tetrCells)
    }
    
}
