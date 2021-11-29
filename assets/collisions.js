function collide (cells,shapes,x,y, pass) {
    //const pass = true;
    const tShapes = shapes;
    const posY = y;
    const posX = x;
    for (let row = 0; row < tShapes.length; row++) {
        
            for (let col = 0; col < tShapes[row].length; col++) {
                    if(tShapes[row][col] != 0) {
                        if(col + posY < 0) {
                            pass = false
                            console.log('this block would be to the left of the playing field');
                            break
                        }
                         if(col + posY >= cells[0].length - 1) {
                           
                             pass = false
                             console.log('this block would be to the right of the playing field');
                             break     
                         }
                        if(row + posX >= cells.length - 1) {
                       
                            pass = false
                            console.log('end of playing field');
                            break
                        }
                         if (cells[row + posX][col + posY].isChecked
                             ) {
                                 const level = cells[col+ posX];
                               // level.forEach((res) => console.log(res.isChecked))
                                 pass = false
                                 console.log('space is taken')
                                 break
                                 ;
                             }
                    }

            
                
            }
        
    }
        
}
export default collide