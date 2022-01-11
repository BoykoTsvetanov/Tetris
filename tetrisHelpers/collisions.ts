import { Cell } from '~/types/globa'

function collideAll(
  cells: Cell[][],
  shapes: number[][],
  x: number,
  y: number,
  pass: boolean
) {
  //const pass = true;
  const tShapes = shapes
  const posY = y
  const posX = x
  for (let row = 0; row < tShapes.length; row++) {
    for (let col = 0; col < tShapes[row].length - 1; col++) {
      if (tShapes[row][col] != 0) {
        if (col + posY <= 0) {
          pass = true
          console.log('this block would be to the left of the playing field')
        }
        if (col + posY >= cells[0].length - 1) {
          pass = true
          console.log('this block would be to the right of the playing field')
        }
        if (row + posX >= cells.length - 1) {
          pass = true
          console.log('end of playing field')
        }
        if (cells[row + posX][col + posY].isChecked) {
          pass = true
          console.log('space is taken')
        }
      }
    }
  }
  return pass
}
function collideCheck(
  cells: Cell[][],
  shapes: number[][],
  x: number,
  y: number
) {
  for (let row = 0; row < shapes.length; row++) {
    for (let col = 0; col < shapes[row].length; col++) {
      if (cells[row + x][col + y].isChecked && shapes[row][col] != 0)
        return true
    }
  }
  return false
}
function leftCheck(y: number) {
  return y < 0
}
function rightCheck(cells: Cell[][], shapes: number[][], x: number) {
  return x + shapes[0].length > cells[0].length
}
function downCheck(cells: Cell[][], shapes: number[][], y: number) {
  return y + shapes.length > cells.length
}
function downLanded(cells: Cell[][], shapes: number[][], y: number) {
  return y + shapes.length === cells.length
}
function rotateShapeRight(cells: Cell[][], shape: number[][], x: number) {
  return x + shape[0].length > cells[0].length
}
function rotateShapeCollide(
  cells: Cell[][],
  shape: number[][],
  x: number,
  y: number
) {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (cells[row + x][col + y].isChecked && shape[row][col] != 0) return true
    }
  }
  return false
}

function landedOnTopOfShape(
  cells: Cell[][],
  shape: number[][],
  x: number,
  y: number,
  keyPressed: string
) {
  if (keyPressed === 'ArrowDown') {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (cells[row + x][col + y].isChecked && shape[row][col] != 0)
          return true
      }
    }
  }
  return false
}
export {
  collideCheck,
  leftCheck,
  rightCheck,
  downCheck,
  downLanded,
  rotateShapeRight,
  rotateShapeCollide,
  landedOnTopOfShape,
}
