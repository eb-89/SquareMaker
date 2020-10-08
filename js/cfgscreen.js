
/* 
Btn ifc:
  button {
    draw()
    select();
    unselect();
  }

*/

function Button(x,y,width,height, idx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.handler = undefined;
  this.selected;
  this.idx = idx;
  this.color = "blue";
}

Button.prototype.onClick = function() {
  this.handler(this.idx);
};

Button.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Button.prototype.setOnClickHandler = function(handler) {
  this.handler = handler;
}

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
    if (
      x > btn.x 
      && y > btn.y 
      && (btn.x + btn.width > x)
      && (btn.y + btn.height > y)
    ) {
      // console.log("true");
      btn.onClick();
    }
  }
}

const cfg = function(modelCfg, viewCfg) {

  // console.log(cfg);

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
    { type: "circle", color: "pink" },
    {  type: "square", color: "cyan" }
  ]

  let _mcfg = modelCfg;
  let _vcfg = viewCfg;

  const selector_color = new RadioButtonSelector(_vcfg.colorscheme, vopts, 50, 50);
  const selector_size = new RadioButtonSelector(_mcfg.dims, mopts, 50, 150);
  const selector_minetype = new RadioButtonSelector(_vcfg.markertype, markeropts, 50, 250);

  return {
    name: 'CFG',
    render: function(ctx, auxCvs) {
      selector_color.draw(ctx);
      selector_size.draw(ctx);
      selector_minetype.draw(ctx);
      back.draw(ctx);

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