import Cell from "./Cell.js";
// import Animator from "./animator.js";
import Board from "./board.js";
// import Button from "./button.js";
import Bar from "./bar.js";
import { Timer } from "./timer.js";


const Mswpscreen = function(config, model) {

  const board = Board(config, model);
  const topBar = Bar(config, model);

  const _ctx = config.cvs.getContext("2d");
  const _auxCvs = config.auxCvs.getContext("2d");

  return {

    render: function() {
      topBar.draw(_ctx, _auxCvs);
      board.render();
    },
    setNavigationHandler(nav) {
      topBar.setNavigationHandler(nav);
    },
    start() {
      board.getModelData();
      model.start();
    },
    handleClick(evt) {
      board.handleClick(evt)
      topBar.handleClick(evt);
    },
    handleMouseMove(mouseX, mouseY) {
      board.handleMouseMove(mouseX,mouseY)
    }
  }
}


export default Mswpscreen