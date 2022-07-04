export default class HtmlView {
    boardToTable(game) {
        let board = game.board
        var div = document.getElementById("game")
        var table = document.createElement("table")
        table.id = "board"
        for (let i = 0; i < board.length; i++) {
            var row = document.createElement("tr")
            for (let j = 0; j < board.length; j++) {
                let cell = document.createElement("td")
                cell.innerHTML = `${board.array[i * board.length + j].value == 0 ? ' ' : board.array[i * board.length + j].value}`;
                cell.id = `${i * board.length + j}`
                cell.onclick = function () {
                    game.cellOnClick(cell.id)
                };
                row.appendChild(cell)
            }
            table.appendChild(row)
        }
        div.appendChild(table)
    }
    UpdateUI(index, secondIndex, board) {
        var cell = document.getElementById(`${index}`)
        cell.innerHTML = ' '
        var cell = document.getElementById(`${secondIndex}`)
        cell.innerHTML = board.array[secondIndex].value
    }
    write(msg) {
        alert(msg)
    }
    read(msg) {
        return prompt(msg)
    }
}

