
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

function RadioButtonSelector(cfg) {
  this.cfg = cfg;
  console.log(cfg)
  let buttons = [];
  for (let i = 0; i < 3; i++) {
    const btn = new Button(i*50, 50, 30, 50, i);
    // console.log(btn);
    btn.setOnClickHandler(function (idx) {
      btn.color = "yellow";
      this.cfg.colorscheme.hidden = "black";
      this.cfg.colorscheme.shown = "lightblue";
      for (const btn of buttons) {
        if (btn.idx != idx) {
          btn.color = "blue";
        }
      }
    }.bind(this))
    buttons.push(btn);
  }

  this.buttons = buttons;
  // this.length = num;
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


const cfg = function(cfg) {

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


  let _cfg = cfg;
  const selector = new RadioButtonSelector(_cfg);

  return {
    name: 'CFG',
    render: function(ctx, auxCvs) {
      // ctx.fillStyle = "cyan";

      //for (const btn of buttons) {
      //  ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
      //}
      selector.draw(ctx);
      back.draw(ctx);

    },
    handleClick: function(x,y, cb ) {
      for (const btn of selector.buttons) {
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
      
      if (
        x > back.x 
        && y > back.y 
        && (back.x + back.width > x)
        && (back.y + back.height > y)
      ) {
        // console.log("true");
        cb("home");
      }

    },

    handleMouseMove: function(x,y) {
      //no-op;
    }
  }
}

export default cfg;