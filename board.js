class Board{
    constructor(length){
        this.length = length;
        this.array = this.#CreateBoard()
    }
    #CreateBoard(){
        for (var array=[],i=0;i<this.length*this.length;++i){
            array[i]=i;
        } 
        do {
            array = this.#Shuffle(array)
        } while (!this.#CheckValidBoard(array));
        return array;
    }

    #Shuffle(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
        return array;
    }
    #CheckValidBoard(array){
        var errors = this.#CountErrors(array);
        if (this.length % 2 == 1){
            return errors%2==0;
        }
        else{
            var nullIndex=-1;
            for (let i = 0; i < array.length; i++) {
                if (array[i] == 0){
                    nullIndex = Math.floor(i/length)+1;   
                    break;
                }                
            }
            return (errors+nullIndex)%2==0;
        }
    }
    #CountErrors(array){
        var errors=0;
        for (let i = 0; i < array.length; i++) {
            for (let j = i+1; j < array.length; j++) {
                if(array[j] != 0 && array[i] > array[j]){
                    errors++;
                }
            }            
        }
        return errors;
    }
}
  
var length = prompt("enter board length")
var board = new Board(length)
console.log(board)

