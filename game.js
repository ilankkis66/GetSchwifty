
export default class Game{
    constructor(board,view){
        this.board=board;
        this.view = view;
    }
    play(){
        this.view.boardToTable(this);
    }
    cellOnClick(position) {
        var id = parseInt(position)
        var array = this.board.array
        var length = this.board.length
        if (Math.floor(id/length)==Math.floor((id-1)/length) && array[id-1].value == 0){ 
            this.#switch(id,id-1)       
        } 
        else if (Math.floor(id/length)==Math.floor((id+1)/length) && array[id+1].value == 0){
            this.#switch(id,id+1)          
        }
        else if (id-length>=0 && array[id-length].value == 0){
            this.#switch(id,id-length)          
        }
        else if (id+length<array.length && array[id+length].value == 0){
            this.#switch(id,id+length)            
        }
        else{
            alert("invalid cell")
        }
        if (this.#checkWin()){
            alert("you win")
        }
    }
    #switch(index,secondIndex){
        this.#switchInBoard(index,secondIndex);
        this.#switchInUI(index,secondIndex);
    }
    #switchInBoard(index,secondIndex){
        let tmp = this.board.array[secondIndex]
        this.board.array[secondIndex] = this.board.array[index]
        this.board.array[index] = tmp 
    }
    #switchInUI(index,secondIndex){ 
        this.view.UpdateUI(index,secondIndex,this.board)
    }
    #checkWin() {
        if (this.board.array[this.board.array.length-1].value!=0){
            return false;
        }
        for (let i = 0; i < this.board.array.length-1; i++) {
            if (this.board.array[i].value != i+1 ){
                return false;
            }                        
        }
        return true

    }
}