import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Cell } from '~/types/globa'
import shapes from '../tetrisHelpers/shapes'
import {
  leftCheck,
  rightCheck,
  downCheck,
  collideCheck,
  rotateShapeRight,
  rotateShapeCollide,
  landedOnTopOfShape,
} from '~/tetrisHelpers/collisions'
import _ from 'lodash'
import rotate from '~/tetrisHelpers/rotation'
export const state = () => ({
  cells: [] as Cell[][],
  currShape: [] as number[][],
  column: 18,
  rows: 10,
  x: 0,
  y: 4,
  gameOver: false,
})
export type RootState = ReturnType<typeof state>
export const mutations: MutationTree<RootState> = {
  setField(state, cells: Cell[][]): void {
    state.cells = cells
  },
  setCurrShape(state, currShape: number[][]): void {
    state.currShape = currShape
  },
  updatePosition(state, { x, y }: { x: number, y: number }): void {
    state.x = x
    state.y = y
  },
  removeLines(state, removedLines): void {
    state.cells = removedLines
  },
  rotateShape(state, rotation): void {
    state.currShape = rotation as any
  },
  gameOver(state) {
    state.gameOver = true
  },
  backToPlay(state) {
    state.gameOver = false
  },
}
export const getters: GetterTree<RootState, RootState> = {
  cells(state) {
    if (!state.cells.length) return []
    const tetrCells: any = _.cloneDeep(state.cells)
    const currShape: any = state.currShape
    const x = state.x
    const y = state.y
    for (let i = 0; i < currShape.length; i++) {
      for (let j = 0; j < currShape[i].length; j++) {
        const currentShape = currShape[i][j]
        if (currentShape > 0) {
          const shapeParams = {
            color: 'bg-red-600',
            isChecked: true,
          }
          tetrCells[i + x][j + y] = shapeParams
        }
      }
    }
    return tetrCells
  },
}
export const actions: ActionTree<RootState, RootState> = {
  initField(context) {
    const cells: any[] = []
    for (let i = 0; i <= context.state.column; i++) {
      cells[i] = []
      for (let j = 0; j <= context.state.rows; j++) {
        const cellsParams = {
          color: 'bg-white-600',
          isChecked: false,
        }
        cells[i].push(cellsParams)
      }
    }
    context.commit('setField', cells)
  },
  creatingPiece(context) {
    const random = Math.floor(Math.random() * shapes.length)
    const currShape = shapes[random]
    context.commit('setCurrShape', currShape)
  },
  keypressEvent({ state, commit, dispatch }, keyPressed) {
    const tetrCells = state.cells
    const currShape = state.currShape
    let x = state.x
    let y = state.y
    if (keyPressed === 'ArrowLeft') {
      y--
    } else if (keyPressed === 'ArrowRight') {
      y++
    } else if (keyPressed === 'ArrowDown') {
      x++
    }
    const passBottom = downCheck(tetrCells, currShape, x)
    if (passBottom) {
      dispatch('landed')
      return
    }
    const passLeftWall = leftCheck(y)
    if (passLeftWall) return
    const passRightWall = rightCheck(tetrCells, currShape, y)
    if (passRightWall) return
    const landedOfTopShape = landedOnTopOfShape(
      tetrCells,
      currShape,
      x,
      y,
      keyPressed
    )
    if (landedOfTopShape) {
      if (x <= 1) {
        commit('gameOver')
      } else {
        dispatch('landed')
      }
      return
    }
    const overlap = collideCheck(tetrCells, currShape, x, y)
    if (overlap) {
      if (x <= 0) {
        commit('gameOver')
      }
      return
    }
    //if(passLeftWall || passRightWall || passBottom || overlap) return
    commit('updatePosition', { x, y })
  },
  landed(context) {
    const freezePiece = _.cloneDeep(context.getters.cells)
    const currentShape: any = context.state.currShape
    const x = context.state.x
    const y = context.state.y
    for (let i = 0; i < currentShape.length; i++) {
      for (let j = 0; j < currentShape[i].length; j++) {
        if (currentShape[i][j] > 0) {
          const shapeParams = {
            color: 'bg-green-500',
            isChecked: true,
          }
          freezePiece[i + x][j + y] = shapeParams
        }
      }
    }
    context.commit('setField', freezePiece)
    context.commit('setCurrShape', [])
    context.commit('updatePosition', { x: 0, y: 4 })
    context.dispatch('creatingPiece')
    context.dispatch('findingLines')
  },
  checkRotation({ state, commit }) {
    const currShape: any = state.currShape
    const tetrCells = state.cells
    const y = state.y
    const x = state.x
    const rotation = rotate(currShape)
    const isRotateRightAllowed = rotateShapeRight(tetrCells, rotation, y)
    if (isRotateRightAllowed) return
    const isRotateOverlapAllowed = rotateShapeCollide(tetrCells, rotation, x, y)
    if (isRotateOverlapAllowed) return
    commit('rotateShape', rotation)
  },
  findingLines({ state, dispatch }) {
    const cells = state.cells
    //     const clearLine:number[] = [];
    //     line.reduce((acc: object[], row:number[]) => {
    //         const filtered = row.filter((x:any) => x.isChecked);
    //         const indexOf = line.indexOf(row);
    //         filtered.length === row.length ? acc.push({indexToClear:indexOf}) : [];
    //         return acc
    //     },
    //     clearLine
    //    );
    dispatch(
      'clearLines',
      cells.reduce((rowIndices, row, index) => {
        if (row.every((cell) => cell.isChecked)) rowIndices.push(index)
        return rowIndices
      }, [] as number[])
    )
  },
  clearLines({ state, commit }, clearLine: number[]) {
    const tetrCells: any = _.cloneDeep(state.cells)
    clearLine.forEach((x) => {
      const index = x
      tetrCells.splice(index, 1)
      tetrCells.unshift(
        new Array(tetrCells[0].length).fill({
          color: 'bg-white-600',
          isChecked: false,
        })
      )
    })
    commit('removeLines', tetrCells)
  },
}
