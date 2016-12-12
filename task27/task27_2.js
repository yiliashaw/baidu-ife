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
  // for (const child of this.children) {
  //   child.update();
  // }
  this.children.forEach(function(child) {
    child.update();
  });
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
  const id = options.id;
  const el = options.el;
  const radius = options.radius;
  const centerX = options.centerX;
  const centerY = options.centerY;
  const velocity = options.velocity;
  const fuelAddVel = options.fuelAddVel;
  const fuelReduceVel = options.fuelReduceVel;

  DisplayObject.call(this);
  this.id = id;
  this.el = el;
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.velocity = velocity;
  this.fuelAddVel = fuelAddVel;
  this.fuelReduceVel = fuelReduceVel;
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
  this.fuel = fuel + this.fuelAddVel - this.fuelReduceVel;
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
    this.fuel += this.fuelAddVel;
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
  this.velocity = shiptype[shiptypeSelect.value].velocity;
  this.fuelAddVel = fuelsys[fuelsysSelect.value].fuelAddVel;
  this.fuelReduceVel = shiptype[shiptypeSelect.value].fuelReduceVel;
};
Spaceship.prototype.stop = function() {
  this.velocity = 0;
  this.fuelAddVel = 0;
  this.fuelReduceVel = 0;
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
  this.command = '';
  const fly = el.querySelector('.fly');
  fly.onclick = function() {
    if (getRandom() === true) {
      this.command = spaceship.id + "0001";
      spaceship.fly();
      log(this.command);
      log("Command sent sucessful.");
    } else {
      log("Failed to send command,we are sending command again.");
      setTimeout(fly.onclick, 200);
    }
  };
  const stop = el.querySelector('.stop');
  stop.onclick = function() {
    if (getRandom() === true) {
      this.command = spaceship.id + "0010";
      spaceship.stop();
      log(this.command);
      log("Command sent sucessful.");
    } else {
      log("Failed to send command,we are sending command again");
      setTimeout(stop.onclick, 200);
    }
  };
  const destroy = el.querySelector('.destroy');
  destroy.onclick = function() {
    if (getRandom() === true) {
      this.command = spaceship.id + "0011";
      log(this.command);
      spaceship.destroy();
      var ev = event.target;
      ev.parentNode.parentNode.removeChild(ev.parentNode);
      log("Command sent sucessful.");
    } else {
      log("Failed to send command,we are sending command again");
      setTimeout(destroy.onclick, 200);
    }
  };
}

function Adapter(options){
  const spaceshipId = options.spaceshipId;
  const status = options.status;
  this.spaceshipId = spaceshipId;
  this.status = status;
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

const shiptype = {
  qianjin: {
    velocity: 3,
    fuelReduceVel: 0.05,
  },
  benteng: {
    velocity: 5,
    fuelReduceVel: 0.07,
  },
  chaoyue: {
    velocity: 8,
    fuelReduceVel: 0.09,
  },
};
const fuelsys = {
  jingliang: {
    fuelAddVel: 0.02,
  },
  guangneng: {
    fuelAddVel: 0.03,
  },
  yongyuan: {
    fuelAddVel: 0.04,
  },

};

const addCtrl = document.querySelector(".add");
var shiptypeSelect = document.querySelector("#shiptype");
var fuelsysSelect = document.querySelector("#fuelsys");
var i = 0;
var id = 0;
addCtrl.onclick = function() {
  if (i > 3) i = 0;
  if (getRandom() === true) {
    //Ship create div
    const el = document.createElement('div');
    el.className = "ship";
    el.innerHTML = 100;
    //Ship instantiate
    const spaceship = new Spaceship({
      id: ("0000" + Number(id).toString(2)).slice(-4),
      el,
      radius: spaceships[i].radius,
      centerX: 399,
      centerY: 245,
      velocity: 0,
      fuelAddVel: 0,
      fuelReduceVel: 0,
    });
    //Controller create
    const ctrEl = document.createElement("div");
    ctrEl.className = "track";
    ctrEl.innerHTML = '第' + (i + 1) + '轨道： <button class="fly">FLY</button> <button class="stop">STOP</button> <button class="destroy">DESTROY</button>';
    document.querySelector("#controller").appendChild(ctrEl);
    const ctrl = new SpaceshipControl({
      el: ctrEl,
      spaceship,
    });
    //Stage addChild
    stage.addChild(spaceship);
    log("Button added sucessful.");
    id++;
    i++;
  } else {
    log("Failed to add button, we are sending command again.");
    setTimeout(addCtrl.onclick, 200);
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

//模拟丢包率（30%丢包率）
// function getRandom1(fn) {
//   var num1 = Math.floor(Math.random() * 100);
//   if (num1 < 50) {
//     console.log(this);
//     fn();
//     log("Command sent sucessful.");
//   } else {
//     log("Failed to send command, we are sending command again.");
//     setTimeout(getRandom1(fn), 200);
//   }
// }


var getRandom = function() {
  var num = Math.floor(Math.random() * 100);
  return num > 50 ? true : false;
}