
       const  lShape = [
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 0],
                ]
        const tShape = [[1,1,1],[0,1,0],[0,0,0]]
       const zShape = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
                ]
       const squareShape = [
                [1, 1], 
                [1, 1]
                ]
        //const lShape = [[1,0,0],[1,0,0],[1,1,0]]
       const lineShape = [[0, 1], [0, 2], [0, 3]]
             
    
        const shapes = [tShape,squareShape,lShape,lineShape,zShape];
        
        const random = Math.floor(Math.random()*shapes.length);
        const tShapes = shapes[random]
       

    export default tShapes;