import Cell from "./Cell.js";
import Animator from "./animator.js";
import Board from "./board.js";
import Button from "./button.js";


const Mswpscreen = function(ctx, auxCvs, model, params) {

  let board = Board(ctx, auxCvs, model, params)

  let back = new Button(300,300,100,20)

  let navigationHandler;

  return {

    render: function(ctx, auxCvs) {
      board.draw(ctx, auxCvs);
      back.draw(ctx);
    },
    setNavigationHandler(nav) {
      navigationHandler = nav;
    },
    start() {
      board.getModelData();
      model.start();
    },
    handleClick(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      board.handleClick(evt)

      if (back.contains(mouseX,mouseY)) {
        navigationHandler("home");
      }
    },
    handleMouseMove(mouseX, mouseY) {
      board.handleMouseMove(mouseX,mouseY)
    }
  }
}


export default Mswpscreen