//TRACKS funciton ,canvas,初始化轨道
var drawing = document.querySelector("#drawing");

function drawCircle(r) {
  if (drawing.getContext) {
    var context = drawing.getContext("2d");
    context.beginPath();
    context.arc(399, 245, r, 0, 2 * Math.PI, false);
    context.strokeStyle = "#ddd";
    context.stroke();
  }
}

//模拟丢包率（30%丢包率）
var getRandom = function() {
  var num = Math.floor(Math.random() * 100);
  return num < 30 ? false : true;
}


//Initialize DisplayObject
function DisplayObject() {
  this.parent = null;
}
DisplayObject.prototype.update = function() {};


//Initialize DisplayObjectContainer
function DisplayObjectContainer() {
  DisplayObject.call(this);
  this.children = [];
}
DisplayObjectContainer.prototype = Object.create(DisplayObject.prototype);
DisplayObjectContainer.prototype.addChild = function(obj) {
  this.children.push(obj);
  this.el.appendChild(obj.el);
  obj.parent = this;
};
DisplayObjectContainer.prototype.removeChild = function(obj) {
  var index = this.children.indexOf(obj);
  this.children.splice(index, 1);
  this.el.removeChild(obj.el);
  obj.parent = null;
};
DisplayObjectContainer.prototype.update = function() {
  for (const child of this.children) {
    child.update();
  }
};


//Initialize Stage
function Stage(options) {
  const el = options.el;
  DisplayObjectContainer.call(this);
  this.el = el;
}
Stage.prototype = Object.create(DisplayObjectContainer.prototype);


//Initialize Spaceship
function Spaceship(options) {
  const el = options.el;
  const radius = options.radius;
  const centerX = options.centerX;
  const centerY = options.centerY;
  DisplayObject.call(this);
  this.el = el;
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.velocity = 0;
  this.fuelVel = 0
  this.charging = false;
  this.setAngle(0);
  this.setFuel(100);
}
Spaceship.prototype = Object.create(DisplayObject.prototype);
Spaceship.prototype.setAngle = function(angle) {
  this.angle = angle + this.velocity / this.radius;
  this.el.style.left = this.centerX + this.radius * Math.cos(this.angle) - 15 + "px";
  this.el.style.top = this.centerY + this.radius * Math.sin(this.angle) - 15 + "px";
};
Spaceship.prototype.setFuel = function(fuel) {
  this.fuel = fuel - this.fuelVel;
  if (this.fuel <= 30) {
    this.el.style.color = "#ea3c45";
  }
};
Spaceship.prototype.update = function() {
  if (!this.charging && this.fuel >= 0) {
    this.setAngle(this.angle);
    this.setFuel(this.fuel);
    this.el.textContent = Math.round(this.fuel);
  } else {
    this.charging = true;
    this.fuel += 0.03;
    if (this.fuel > 30) {
      this.el.style.color = "#f4f2e8";
    }
    if (this.fuel >= 100) {
      this.charging = false;
    }
    this.el.textContent = Math.round(this.fuel);
  }
};
Spaceship.prototype.fly = function() {
  this.velocity = 2;
  this.fuelVel = 0.05;
};
Spaceship.prototype.stop = function() {
  this.velocity = 0;
  this.fuelVel = 0;
};
Spaceship.prototype.destroy = function() {
  this.parent.removeChild(this);
};


//Initialize SpaceshipControl
function SpaceshipControl(options) {
  const el = options.el;
  const spaceship = options.spaceship;
  this.el = el;
  this.spaceship = spaceship;
  const fly = el.querySelector('.fly');
  fly.onclick = function() {
    if (getRandom() === true) {
      spaceship.fly();
      log("Command sent sucessful.");
    } else {
      log("Failed to send command.");
    }
  };
  const stop = el.querySelector('.stop');
  stop.onclick = function() {
    if (getRandom() === true) {
      spaceship.stop();
      log("Command sent sucessful.");
    } else {
      log("Failed to send command.");
    }

  };
  const destroy = el.querySelector('.destroy');
  destroy.onclick = function() {
    if (getRandom() === true) {
      spaceship.destroy();
      var ev = event.target;
      ev.parentNode.parentNode.removeChild(ev.parentNode);
      log("Command sent sucessful.");
    } else {
      log("Failed to send command.");
    }
  };
}


const stage = new Stage({
  el: document.getElementById("universe"),
});

const spaceships = [{
  radius: 110,
}, {
  radius: 150,
}, {
  radius: 190,
}, {
  radius: 230
}];

const addCtrl = document.querySelector(".add");
addCtrl.onclick = function() {
  if (getRandom() === true) {
    for (const config of spaceships) {
      //Ship create div
      const el = document.createElement('div');
      el.className = "ship";
      el.innerHTML = 100;
      //Ship instantiate
      const spaceship = new Spaceship({
        el,
        radius: config.radius,
        centerX: 399,
        centerY: 245,
      });
      //Controller create
      const ctrEl = document.createElement("div");
      ctrEl.className = "track";
      ctrEl.innerHTML = '<button class="fly">FLY</button> <button class="stop">STOP</button> <button class="destroy">DESTROY</button>';
      document.querySelector("#controller").appendChild(ctrEl);
      const ctrl = new SpaceshipControl({
        el: ctrEl,
        spaceship,
      });
      //Stage addChild
      stage.addChild(spaceship);
    }
    log("Button added sucessful.");
  } else {
    log("Failed to add button.");
  }

};


const update = function() {
  stage.update();
  setTimeout(update, 16);
}
setTimeout(update, 16);


/*---------------------EVENT----------------------------*/
//Init
function init() {
  var arr = [110, 150, 190, 230];
  arr.forEach(function(item) {
    drawCircle(item);
  });

}

init();


//Log information
const logInfo = document.querySelector(".loginfo");
function log(msg) {
  var time = new Date();
  const pEl = document.createElement('p');
  pEl.className = "log";
  pEl.textContent = time.toLocaleTimeString() + ': ' + msg;
  logInfo.appendChild(pEl);
}
