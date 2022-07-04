import BoardFactory from "../models/boardFactory.js"
import Game from "../controller/game.js"
import HtmlView from "../view/HtmlView.js"

export default class bootstrapper {
    initGame() {
        var boardFactory = new BoardFactory();
        var view = new HtmlView()
        return new Game(boardFactory, view)
    }
}

