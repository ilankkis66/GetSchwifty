import BoardFactory from "./boardFactory.js"
import Game from "./game.js"
import HtmlView from "./HtmlView.js"



var boardFactory = new BoardFactory();
var view = new HtmlView()
var game = new Game(boardFactory,view)
game.play()
