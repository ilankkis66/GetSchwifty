import BoardFactory from "./boardFactory.js"
import Game from "./game.js"
import HtmlView from "./HtmlView.js"



var length = prompt("enter board length")
var board = new BoardFactory().CreateBoard(length)
var view = new HtmlView()
var game = new Game(board,view)
game.play()
