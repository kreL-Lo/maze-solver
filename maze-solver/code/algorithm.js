function checkInSet(p,mul){
    for(let i =0;i<mul.length;i++){
        if(p.getPos().x == mul[i].getPos().x && p.getPos().y == mul[i].getPos().y)
            return true;
    }
    return false;
}

class Point {
    constructor(pos,matrix){
        this.L= this.calculateCartezian('L',matrix,pos)
        this.U =  this.calculateCartezian('U',matrix,pos)
        this.D =  this.calculateCartezian('D',matrix,pos)
        this.R = this.calculateCartezian('R',matrix,pos)
        this.pos = pos
    }
    getPos(){
        return this.pos;
    }
    getL(){
        return this.L;
    }
    getU(){
        return this.U;
    }
    
    getD(){
        return this.D;
    }
    getR(){
        return this.R;
    }
    calculateCartezian(type,matrix,pos){
        let x=pos.x;
        let y=pos.y     
        try{
            switch(type)
            {
                case 'L':
                    y = y-1;
                    break;
                case 'U':
                    x=x-1;
                    break;
                case 'D':
                    x=x+1;
                    break;
                case 'R':
                    y=y+1;
                    break;    
            }
        
            return matrix[x][y]

        }catch(e){
            return 1;
        }
    }
    getAvailablePoints(){
     let points = [];
     let x = this.pos.x;
     let y= this.pos.y;
    
     if(this.L==0){//Y=Y-1
        y=y-1;
        points.push(new Point({x,y},this.matrix));
     }
     x= this.pos.x;
     y = this.pos.y;
     if(this.R==0){
         y=y+1;
         points.push(new Point({x,y},this.matrix));
     }
     x= this.pos.x;
     y = this.pos.y;
     if(this.U == 0){
         x =x-1;
         points.push(new Point({x,y},this.matrix));
     }
     x= this.pos.x;
     y = this.pos.y;
     if(this.D==0){
        x=x+1;
        points.push(new Point({x,y},this.matrix));
     }
     return points;
    }
    getTest(){
        return "wtf"
    }
}
class State{

    constructor(pos,endPos,matrix){
        this.endPos = endPos;
        //reprezentarea ; point e format din valori booleane care reprezinta left,right, up , down 
        //point are si niste coordonate(x,y) din matrice
        //matricea, nodurile vizitate, si path-ul
        //path-ul se calculeaza in timp de parcurgere 
        //vizited == toate nodurile vizitate
        this.point = new Point(pos,matrix)
        this.matrix = matrix;
        this.visited = []
        this.path =[this.point]
    }
    checkFinalState(){
        let pos = this.point.getPos()
        if(pos.x == this.endPos.x && pos.y == this.endPos.y){
            return true;
        }
        return false;
    }
    getVisited(){
        return this.visited;
    }
    getPath(){
        return this.path;
    }
    getPoint(){
        return this.point;
    }
    tranzition_bk(pos){
        return new State(pos,this.endPos,this.matrix)
    }
    tranzition(pos){
        var p = new Point(pos,this.matrix);
        //validate
        
        if(!(p in this.visited)){
            this.visited.push(p);
        }
        this.point=p
        this.pos = pos;
    }
    
    //verific daca e valabim punctu in care vreau sa ma     
    checkTranzition(){
        let pos = this.point.getPos()
        //console.log(this.matrix)
        //console.log(pos,this.matrix[pos.x][pos.y],this.matrix)
        if(this.matrix[pos.x][pos.y]==1||this.matrix[pos.x][pos.y]==2){
            return false;
        }
        return true;
    }
    //functie util pentru a determina daca am epuizat toate posibilitatile existente
    checkHasTurn(){
        let mul = this.path;
        //console.log(mul)
        for ( let i =0 ;i<this.path.length;i++)
        {
            let p1 = mul[i];
            if(this.checkCartesian(p1,mul)==true){
                return true;
            }
        }
        return false;
    }
    checkCartesian(p,mul){
        //1 = WALL
        if(p.getL()==1&&p.getD()==1&&p.getR()==1&&p.getU()==1){
            return false;
        }
        //LEFT
        let x,y
        x= p.getPos().x;y = p.getPos().y;
        if(p.getL()==0){
            x=x- 1;
            let p1 = new Point({x,y},this.matrix)            
            if(!(p1 in mul)){
                return true;
            }
        }
        //RIGHT
        x= p.getPos().x;y = p.getPos().y;
        if(p.getR()==0){
            x=x+1;
            let p1 = new Point({x,y},this.matrix)            
            if(!(p1 in mul)){
                return true;
            }
        }
        //UP
        x= p.getPos().x;y = p.getPos().y;
        if(p.getU()==0){
            y=y-1;
            let p1 = new Point({x,y},this.matrix)            
            if(!(p1 in mul)){
                return true;
            }
        }
        //DOWN
        x= p.getPos().x;y = p.getPos().y;
        
        if(p.getD()==0){
            y=y+1;
            let p1 = new Point({x,y},this.matrix)            
            
            if(!(p1 in mul)){
                return true;
            }
        }

        return false;

    
    }

    getPoint(){
        return this.point;
    }
    getMatrix()
    {
        return this.matrix;
    }
}
class Alg{
    
    constructor(matrix){
        this.matrix=matrix  
    }
    initState(startPos,finalPos){

        if(this.matrix[startPos.x][startPos.y]==1||this.matrix[finalPos.x][finalPos.y]==1)
        {
            return null;
        }
        this.finalPos = finalPos;
        return new State(startPos,finalPos,this.matrix)
    }
    checkFinalState(){
        
        if(pos.x == this.finalPos.x && pos.y ==this.finalPos.y){
            return true;                    
        }
        return false;
    }

    async bfs_start(startPos,endPos){
        
        let state = this.initState(startPos,endPos)
                
        let drawMatrix =[]
        for (var i = 0; i < this.matrix.length; i++)
            drawMatrix[i] = this.matrix[i].slice();

        drawMatrix[state.getPoint().getPos().x][state.getPoint().getPos().y]=2;
        drawMatrix[startPos.x][startPos.y]=5
        drawMatrix[endPos.x][endPos.y]=6
        draw_maze(drawMatrix)
        var stack = new Stack(state.getVisited())
        let availablePoints = state.getPoint().getAvailablePoints()
        for ( let j= 0;j<availablePoints.length;j++){
            stack.push(availablePoints[j])
        }
        let found = false;
        while(stack.isEmpty()==false){

            let nextPoint = stack.pop()
            state.tranzition(nextPoint.getPos())
            if(state.checkFinalState()){
                found = true;
                break;
                
            }
            let pos =nextPoint.getPos() 

            await new Promise(r => setTimeout(r, 50));
            drawMatrix[pos.x][pos.y]=2;
            draw_maze(drawMatrix)
            
            let availablePoints = state.getPoint().getAvailablePoints()
            for ( let j= 0;j<availablePoints.length;j++){
                stack.push(availablePoints[j])
            }
        }
        if(found==true){
            console.log('Found a path')
        }else{
            console.log('Could not find a path')
        }
        
        
    }   
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
      
    async hc_start(startPos,endPos,nrTimes){
        let state = this.initState(startPos,endPos)
        
        let drawMatrix =[]
        for (var i = 0; i < this.matrix.length; i++)
            drawMatrix[i] = this.matrix[i].slice();
        
        drawMatrix[state.getPoint().getPos().x][state.getPoint().getPos().y]=2;
        drawMatrix[startPos.x][startPos.y]=5
        drawMatrix[endPos.x][endPos.y]=6
        draw_maze(drawMatrix)
        
        //let visited = []
        let path = []
        path.push(startPos)
        let curValue = this.hc_fun(startPos,endPos);
        
        let found = false
        
        for(let i=0;i<nrTimes;i++){
            let availablePoints = state.getPoint().getAvailablePoints()
            this.shuffle(availablePoints)
            for ( let j =0;j<availablePoints.length;j++){
                let pos_tmp = availablePoints[j].getPos()
                let tmp_val =this.hc_fun(endPos,pos_tmp)
                
                if(tmp_val<curValue){
                    curValue = tmp_val
                    state.tranzition(pos_tmp)
                    let pos = state.getPoint().getPos()
                    path.push(pos)
                    await new Promise(r => setTimeout(r, 100));           
                    drawMatrix[pos.x][pos.y]=2;
                    draw_maze(drawMatrix)
                    if(state.checkFinalState()){
                        i = nrTimes;
                        found = true;
                    }
                    break;
                }
            }
        }
        if(found ==true){
            for( let i= 0;i<path.length;i++){
                drawMatrix[path[i].x][path[i].y]=4
                draw_maze(drawMatrix)
                await new Promise(r => setTimeout(r, 100));           
                console.log(path[i])
            }
            
        }
        draw_maze(drawMatrix)
    }
    hc_fun(p,q){    
        return Math.sqrt( Math.pow(p.x - q.x,2) + Math.pow(p.y - q.y,2 ))
    }
    
    async bk_start(startPos,endPos){
        this.matrix[startPos.x][startPos.y] = 5
        this.matrix[endPos.x][endPos.y] = 6
        draw_maze(this.matrix)
        await new Promise(r => setTimeout(r, 200));           
        let state = this.initState(startPos,endPos)
        let res = this.step(state)
        let path = []
        if( res== true){
            
            for ( let i = 0;i<this.matrix.length;i++){
                for (let j= 0;j<this.matrix[0].length;j++){
                    if(this.matrix[i][j]==2){
                        path.push({x:i,y:j})           
                    }
            }
        }
        path.push(this.finalPos)
        
        console.log(res)
        draw_maze(this.matrix)
        if(res==true){
            for( let i= 0;i<path.length;i++){
                this.matrix[path[i].x][path[i].y]=4
                await new Promise(r => setTimeout(r, 50));           
                draw_maze(this.matrix)
            }
        }
        draw_maze(this.matrix)
    }}
    
    step(state){
        
        if(state.checkFinalState()){
            return true;
        }
        
        if(state.checkTranzition()==false){
            return false
        }
        //right
        draw_maze(this.matrix)
        
        let pos = state.getPoint().getPos()
        this.matrix[pos.x][pos.y]=2;
        let result,newState;

        newState = state.tranzition_bk({x:pos.x,y:pos.y+1})
        result = this.step(newState)
        if(result == true){
            return true
        }
        //up

        pos = state.getPoint().getPos()
        //pos.x = pos.x-1
        
        newState = state.tranzition_bk({x:pos.x-1,y:pos.y})
        result = this.step(newState)
        if(result == true){
            return true
        }

        //left

        pos = state.getPoint().getPos()
        newState = state.tranzition_bk({x:pos.x,y:pos.y-1})
        result = this.step(newState)
        if(result == true){
            return true
        }

        //down
        pos = state.getPoint().getPos()
        //pos.x = pos.x+1
        newState = state.tranzition_bk({x:pos.x+1,y:pos.y})
        result = this.step(newState)
        if(result == true){
            return true
        }
        pos = state.getPoint().getPos()
        this.matrix[pos.x][pos.y]=0;
        return false;
    }
    sa_comp_fun(pos_cur,pos_neighbour,endPos,Temperature){
        let tmp = this.hc_fun(pos_cur,endPos)-this.hc_fun(pos_neighbour,endPos)
        //1000
        let k = 1.349*Math.pow(10,-23)
        tmp = this.toPozitivie(tmp)
        let  p =Temperature*k
        let c = tmp
        p = c/p
        p=p*(-1)
        console.log(p)
        let d =Math.exp(p) 
        console.log(d)
            //p = (-1)* (tmp / Temp* k )
        return d
    }
    toPozitivie(tmp){
        if(tmp>0){
            return tmp
        }
        return (-1)*tmp;
    }
    async annealing_start(startPos,endPos){
        let state = this.initState(startPos,endPos)
        
        let drawMatrix =[]
        for (var i = 0; i < this.matrix.length; i++)
            drawMatrix[i] = this.matrix[i].slice();
        
        drawMatrix[state.getPoint().getPos().x][state.getPoint().getPos().y]=2;
        drawMatrix[startPos.x][startPos.y]=5
        drawMatrix[endPos.x][endPos.y]=6
        draw_maze(drawMatrix)
        
        //let visited = []
        let visited = []
        visited.push(new Point(startPos,this.matrix))
        let curValue = this.hc_fun(startPos,endPos);
        
        let found_A = false
        let T=10000
        while(T>1){

            let availablePoints = this.getAvailablePoint(visited)
            this.shuffle(availablePoints)
            
            for ( let j =0;j<availablePoints.length;j++){
                
                let pos_tmp = availablePoints[j].getPos()
                let tmp_val =this.hc_fun(endPos,pos_tmp)
                let pos_cur = state.getPoint().getPos()
                let r = Math.random()
              
                if(tmp_val<curValue){
                    console.log('here1')

                    curValue = tmp_val
                    state.tranzition(pos_tmp)
                    if(state.checkFinalState()){
                        found_A= true;
                        T=0
                        break;
                    }
                    let pos = state.getPoint().getPos()
                    visited.push(new Point(pos,this.matrix))
                    await new Promise(r => setTimeout(r, 50));           
                    if(drawMatrix[pos.x][pos.y]==2){
                        drawMatrix[pos.x][pos.y]=3;
                    }else{
                        drawMatrix[pos.x][pos.y]=2;
                    }
                    draw_maze(drawMatrix)   
                    break;  
                } 
                else if(Math.random()>this.sa_comp_fun(pos_cur,pos_tmp,endPos,T)){
                    console.log('here')
                    curValue = tmp_val
                    state.tranzition(pos_tmp)
                    if(state.checkFinalState()){
                        found_A= true;
                        T=0
                        break;
                    }
                    let pos = state.getPoint().getPos()
                    visited.push(new Point(pos,this.matrix))
                    await new Promise(r => setTimeout(r, 50));           
                    if(drawMatrix[pos.x][pos.y]==2){
                        drawMatrix[pos.x][pos.y]=3;
                    }else{
                        drawMatrix[pos.x][pos.y]=2;
                    }
                    draw_maze(drawMatrix)
                    break
                }
            }
            T=T*0.9
        }
        console.log(found_A)
        if(found_A ==true){
            console.log('Found a path')
        }else{
            console.log('Did not found a path')
        }
        draw_maze(drawMatrix)
    }
    getAvailablePoint(visited){
        let availablePoints = []
        for(let i= 0;i<visited.length;i++){
            let p = visited[i]
            let av = p.getAvailablePoints()
            for(let j=0;j<av.length ;j++){
                let check = true;
                for(let k = 0;k<availablePoints.length;k++){
                    let p1 = av[j].getPos()
                    let p2 = availablePoints[k].getPos()
                    if(p1.x==p2.x && p1.y==p2.y){
                        check = false;
                        break;
                    }
                }
                if(check ==true)
                    for( let l =0 ; l<visited.length;l++){
                        let p3 = av[j].getPos()
                        let p4 = visited[l].getPos()
                        if(p3.x==p4.x && p3.y==p4.y){
                            check = false;
                            break;
                        }
                    }
                    if(check == true)
                        availablePoints.push(av[j])
            }
        }
        return availablePoints
    }
    
}


//lil_maze[7][11]=1
draw_maze(lil_maze)

alg = new Alg(lil_maze)
//alg.bfs_start({x:1,y:1},{x:8,y:11})
//alg.hc_start({x:1,y:1},{x:8,y:3},100) // positions that work {8,3 } , don't 8,5

//alg.bk_start({x:1,y:1},{x:8,y:11})
alg.annealing_start({x:1,y:1},{x:8,y:11})
