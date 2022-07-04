class Board{
    constructor(length){
        this.length = parseInt(length);
        this.array = this.#CreateBoard()
    }
    #CreateBoard(){
        for (var array=[],i=0;i<this.length*this.length;++i){
            array[i]=new Cell(i);
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
                if (array[i].value == 0){
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
                if(array[j].value != 0 && array[i].value > array[j].value){
                    errors++;
                }
            }            
        }
        return errors;
    }
}

class Cell{
    constructor(value){
        this.value=value;
    }
}

class Game{
    constructor(board){
        this.board=board;
    }
    play() {
    }
    
    checkWin() {
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
  
function boardToHtmlTable(board) {
    var table = document.getElementById("board")
    for (let i = 0; i < board.length; i++) {
        var row = document.createElement("tr")
        for (let j = 0; j < board.length; j++) { 
            var cell = document.createElement("td")
            cell.innerHTML = `${board.array[i*board.length+j].value == 0 ? ' ':board.array[i*board.length+j].value}`;
            cell.id=`${i*board.length+j}`
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
}
function addOnClick(game) {
    var table = document.getElementById("board")
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            id = parseInt(table.rows[i].cells[j].id)
            if (Math.floor(id/3)==Math.floor((id-1)/3) && game.board.array[id-1].value == 0){
                let tmp = game.board.array[id-1]
                game.board.array[id-1] = game.board.array[id]
                game.board.array[id] = tmp 
                var cell = document.getElementById(`${id}`)
                cell.innerHTML = ' '
                var cell = document.getElementById(`${id-1}`)
                cell.innerHTML = game.board.array[id-1].value           
            } 
            else if (Math.floor(id/3)==Math.floor((id+1)/3) && game.board.array[id+1].value == 0){
                let tmp = game.board.array[id+1]
                game.board.array[id+1] = game.board.array[id]
                game.board.array[id] = tmp 
                var cell = document.getElementById(`${id}`)
                cell.innerHTML = ' '
                var cell = document.getElementById(`${id+1}`)
                cell.innerHTML = game.board.array[id+1].value           
            }
            else if (id-game.board.length>=0 && game.board.array[id-game.board.length].value == 0){
                let tmp = game.board.array[id-game.board.length]
                game.board.array[id-game.board.length] = game.board.array[id]
                game.board.array[id] = tmp 
                var cell = document.getElementById(`${id}`)
                cell.innerHTML = ' '
                var cell = document.getElementById(`${id-game.board.length}`)
                cell.innerHTML = game.board.array[id-game.board.length].value           
            }
            else if (id+game.board.length<game.board.array.length && game.board.array[id+game.board.length].value == 0){
                let tmp = game.board.array[id+game.board.length]
                game.board.array[id+game.board.length] = game.board.array[id]
                game.board.array[id] = tmp 
                var cell = document.getElementById(`${id}`)
                cell.innerHTML = ' '
                var cell = document.getElementById(`${id+game.board.length}`)
                cell.innerHTML = game.board.array[id+game.board.length].value           
            }
            else{
                alert("invalid cell")
            }
            if (game.checkWin()){
                alert("you win")
            }
        };
    }
}
window.addEventListener("load",()=>{
    var length = prompt("enter board length")
    var board = new Board(length)
    var game = new Game(board)
    boardToHtmlTable(game.board)
    addOnClick(game)
});



