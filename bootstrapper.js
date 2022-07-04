import BoardFactory from "./models/boardFactory.js"
import Game from "./controller/game.js"
import HtmlView from "./view/HtmlView.js"



var boardFactory = new BoardFactory();
var view = new HtmlView()
var game = new Game(boardFactory,view)
game.play()
