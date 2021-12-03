
function rotate(currentShape:number[][]) {
    return Array.from(currentShape[0],(x,col) => Array.from(currentShape,(y,row) => currentShape[row][currentShape[0].length - col - 1])) 
 
}
export default rotate