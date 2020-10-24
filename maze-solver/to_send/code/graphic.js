
var canvas= document.getElementById('renderCanvas')
ctx = canvas.getContext('2d')

function setBackgroundColor(color,ctx){
    ctx.fillStyle= color
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
setBackgroundColor('gray',ctx)

class Square{
    getSquare(){
        return this;
    }
    getColor(){
        return this.color;
    }
    getSize(){
        return this.size;
    }
    getPos(){
        return this.pos;
    }
    constructor(color,size,pos){
        this.color = color;
        this.size = size;
        this.pos = pos;
    }
    
    checkColision(square){
        A = [this.pos.x,this.pos.y]
        B = [this.pos.x+this.size,this.pos.y+this.size];
        C = [square.getPos().x,square.getPos().y]
        D = [square.getPos().x+square.getSize(),square.getPos().y+square.getSize()]
        if(C[0]>=A[0]&&C[1]>=A[1]&&D[0]<=B[0]&&D[1]<=B[1]){
            return true;
        }
        return false;
    }
    drawSquare(ctx){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.pos.x,this.pos.y,this.size-1,this.size-1);
        
    }
}
var SQUARE_WALL_SIZE = 10;
var SQUARE_WALL_COLOR = 'black'
var SQUARE_INSIDE_SIZE = SQUARE_WALL_SIZE
var SQUARE_INSIDE_COLOR= 'white'

var matrix =lil_maze
console.log(matrix.length)

var start_pos = {x:0,y:0}

function draw_maze(matrix){
    for(let i =0 ;i<matrix.length;i++){
        for(let j = 0;j<matrix[0].length;j++){
            let size = SQUARE_WALL_SIZE
            let x = start_pos.x+j*size;
            let y = start_pos.y+i*size  ;
            if(matrix[i][j]==1){
                sqr = new Square(SQUARE_WALL_COLOR,size,{x,y})
                sqr.drawSquare(ctx)
                //square_wall.push(sqr)
            }
            else if(matrix[i][j]==0){
                sqr = new Square(SQUARE_INSIDE_COLOR,size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
            else if(matrix[i][j]==2){
                sqr = new Square('red',size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
            else if(matrix[i][j]==3){
                sqr = new Square('purple',size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
            else if(matrix[i][j]==4){
                sqr = new Square('green',size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
            else if(matrix[i][j]==5){
                sqr = new Square('yellow',size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
            else if(matrix[i][j]==6){
                sqr = new Square('orange',size,{x,y})
                sqr.drawSquare(ctx)
                //square_inside.push(sqr)
            }
        }
    }
}


draw_maze(matrix)