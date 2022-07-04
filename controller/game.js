export default class Game {
    constructor(boardFactory, view) {
        this.boardFactory = boardFactory;
        this.view = view;
        var len = view.read("enter board length");
        this.board = boardFactory.CreateBoard(len);
    }
    play() {
        this.view.boardToTable(this);
    }
    cellOnClick(position) {
        var id = parseInt(position);
        var array = this.board.array;
        var length = this.board.length;
        if (Math.floor(id / length) == Math.floor((id - 1) / length) && array[id - 1].id == array.length) {
            this.#switch(id, id - 1);
        }
        else if (Math.floor(id / length) == Math.floor((id + 1) / length) && array[id + 1].id == array.length) {
            this.#switch(id, id + 1);
        }
        else if (id - length >= 0 && array[id - length].id == array.length) {
            this.#switch(id, id - length);
        }
        else if (id + length < array.length && array[id + length].id == array.length) {
            this.#switch(id, id + length);
        }
        else {
            this.view.write("invalid cell");
        }
        if (this.#checkWin()) {
            this.view.write("you win");
        }
    }
    #switch(index, secondIndex) {
        this.#switchInBoard(index, secondIndex);
        this.#switchInUI(index, secondIndex);
    }
    #switchInBoard(index, secondIndex) {
        let tmp = this.board.array[secondIndex];
        this.board.array[secondIndex] = this.board.array[index];
        this.board.array[index] = tmp;
    }
    #switchInUI(index, secondIndex) {
        this.view.UpdateUI(index, secondIndex, this.board);
    }
    #checkWin() {
        if (this.board.array[this.board.array.length - 1].id != this.board.array.length) {
            return false;
        }
        for (let i = 0; i < this.board.array.length - 1; i++) {
            if (this.board.array[i].id != i + 1) {
                return false;
            }
        }
        return true;
    }
}