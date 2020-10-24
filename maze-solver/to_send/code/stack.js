class Stack{
    constructor(visited){
        this.visited=visited;
        this.items=[]
    }
    push(itm){
        if(this.checkInside(itm)==false&&this.checkVisited(itm)==false){

            this.items.push(itm)
        }
    }
    checkInside(itm){
        for(let i =0;i<this.items.length;i++)
        {
            if(this.items[i].getPos().x==itm.getPos().x&& this.items[i].getPos().y==itm.getPos().y){
                return true;
            }
        }
        return false;
    }
    checkVisited(itm){
        for (let i =0;i<this.visited.length;i++){
            if(this.visited[i].getPos().x==itm.getPos().x&& this.visited[i].getPos().y==itm.getPos().y){
                return true;
            }
        }
        return false;
    }
    pop(){
        return this.items.pop()
    }
    isEmpty(){
        return this.items.length==0;
   }
}