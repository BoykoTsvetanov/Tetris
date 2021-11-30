function collideAll (cells,shapes,x,y, pass) {
    //const pass = true;
    const tShapes = shapes;
    const posY = y;
    const posX = x;
   
    for (let row = 0; row < tShapes.length; row++) {
        
            for (let col = 0; col < tShapes[row].length - 1; col++) {
                    if(tShapes[row][col] != 0) {
                        if(col + posY <= 0) {
                            pass = true
                        
                            console.log('this block would be to the left of the playing field');
                          
                        }
                         if(col + posY >= cells[0].length - 1) {
                           
                             pass = true
                        
                             console.log('this block would be to the right of the playing field');
                            
                         }
                        if(row + posX >= cells.length - 1) {
                            pass = true
                        
                            console.log('end of playing field');
                           
                           
                        }
                         if (cells[row + posX][col + posY].isChecked
                             ) {
                                 pass = true
                            
                                 console.log('space is taken')
                               
                             }
                    }

            
                
            }
           
    }
        return pass
}
function collideCheck (cells,shapes,x, y) {
    
    for (let row = 0; row < shapes.length; row++) {
        for (let col = 0; col < shapes[row].length; col++) {
           if(cells[row + x][col + y].isChecked && shapes[row][col] != 0) return true
        }
    }
        
    return false
}
function leftCheck(y) {
    return y < 0
    
}
function rightCheck (cells,shapes,x) {
    return x + shapes[0].length > cells[0].length
   
}
function downCheck (cells,shapes,y) {
    
    return y + shapes.length > cells.length;

}
function downLanded (cells,shapes,y) {
    return y + shapes.length === cells.length
}

export { collideCheck, leftCheck, rightCheck, downCheck, downLanded }

