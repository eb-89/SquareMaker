
import { Button } from "./button.js"

function RadioButtonSelector(cfg, opts, x, y) {
  this.cfg = cfg;
  // console.log(cfg)
  this.x = x;
  this.y = y;
  let buttons = [];

  let count = 0;

  for (const opt of opts) {
    const btn = new Button(count*(this.x+5), this.y, 30, 50, count);

    btn.setOnClickHandler(function (idx) {
      btn.color = "yellow";
      for (const prop in opt) {
        this.cfg[prop] = opt[prop];
      }
      for (const btn of buttons) {
        if (btn.idx != idx) {
          btn.color = "blue";
        }
      }
    }.bind(this))
    buttons.push(btn);
    count++;
  }

  this.buttons = buttons;
}

RadioButtonSelector.prototype.draw = function(ctx) {
  for (const btn of this.buttons) {
    btn.draw(ctx);
  }
}

RadioButtonSelector.prototype.update = function() {
  for (const btn of this.buttons) {
    btn.update();
  }
}

RadioButtonSelector.prototype.select = function(num) {
  for (const btn of this.buttons) {
    btn.update();
  }
}

RadioButtonSelector.prototype.handleClick = function(x,y) {
  for (const btn of this.buttons) {
    if ( btn.contains(x,y)) {
      btn.onClick();
    }
  }
}

const cfg = function(config) {

  const _ctx = config.cvs.getContext("2d");
  const _auxCvs = config.auxCvs;
  const back = {
    x: 0,
    y: 300,
    width: 200,
    height: 50,
    draw(ctx) {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x,this.y, this.width, this.height);
    }
  }

  let navigationHandler;

  let vopts = [
    {shown: "red", hidden: "blue"},
    {shown: "darkgreen", hidden: "lightgreen"},
    {shown: "darkgray", hidden: "lightgray"},
  ]

  let mopts = [
    {x: 10, y: 10},
    {x: 15, y: 15}
  ]

  let markeropts = [
    { type: "flag", color: "lightgreen" },
    {  type: "triangle", color: "brown" }
  ]

  let _mcfg = config.mcfg;
  let _vcfg = config.vcfg;

  const selector_color = new RadioButtonSelector(_vcfg.colorscheme, vopts, 50, 50);
  const selector_size = new RadioButtonSelector(_mcfg.dims, mopts, 50, 150);
  const selector_minetype = new RadioButtonSelector(_vcfg.markertype, markeropts, 50, 250);

  return {
    name: 'CFG',
    render: function() {
      selector_color.draw(_ctx);
      selector_size.draw(_ctx);
      selector_minetype.draw(_ctx);
      back.draw(_ctx);

    },
    handleClick: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const x = evt.clientX - rect.x;
      const y = evt.clientY - rect.y;
      
      selector_color.handleClick(x,y);
      selector_size.handleClick(x,y);
      selector_minetype.handleClick(x,y)
      
      if (
        x > back.x 
        && y > back.y 
        && (back.x + back.width > x)
        && (back.y + back.height > y)
      ) {
        navigationHandler("home");
      }

    },

    handleMouseMove: function(x,y) {
      //no-op;
    },
    setNavigationHandler(nav) {
      navigationHandler = nav;
    }
  }
}

export default cfg;