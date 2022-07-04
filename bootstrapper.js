import BoardFactory from "./boardFactory.js"
import Game from "./game.js"

function boardToHtmlTable(board) {
    var div = document.getElementById("game")
    var table = document.createElement("table")
    table.id = "board"
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
    div.appendChild(table)
}

function addOnClick(game) {
    var table = document.getElementById("board")
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            game.cellOnClick(table.rows[i].cells[j].id)
        };
    }
}
window.addEventListener("load",()=>{
    var length = prompt("enter board length")
    var board = new BoardFactory().CreateBoard(length)
    var game = new Game(board)
    boardToHtmlTable(game.board)
    addOnClick(game)
});
