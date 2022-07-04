import Cell from "./cell.js"
import Board from "./board.js"

export default class numericBoardFactory{
    CreateBoard(length){
        for (var array=[],i=1;i<length*length;++i){
            array[i]=new Cell(i,i);
        } 
        array[0]=new Cell(0,length*length)
        do {
            array = this.#Shuffle(array)
        } while (!this.#CheckValidBoard(array,length));
        return new Board(length,array);
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
    #CheckValidBoard(array,length){
        var errors = this.#CountErrors(array);
        if (length % 2 == 0){
            for (let i = 0; i < array.length; i++) {
                if (array[i].value == 0){
                    errors += Math.floor(i/length)+1;   
                    break;
                }                
            }
        }
        return errors%2==0;
    }
    #CountErrors(array){
        var errors=0;
        for (let i = 0; i < array.length; i++) {
            for (let j = i+1; j < array.length; j++) {
                if(array[j].value != 0 && array[i].value > array[j].value){
                    errors++;
                }
            }            
        }
        return errors;
    }
}