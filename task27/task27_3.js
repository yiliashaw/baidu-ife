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
  const curState = options.curState;

  DisplayObject.call(this);
  this.id = id;
  this.el = el;
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.velocity = velocity;
  this.fuelAddVel = fuelAddVel;
  this.fuelReduceVel = fuelReduceVel;
  this.curState = curState;
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
  if (!this.charging && this.fuel >= 0 && this.curState === "fly") {
    this.setAngle(this.angle);
    this.setFuel(this.fuel);
    this.el.textContent = Math.round(this.fuel);
  } else if (this.fuel <= 0) {
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

Spaceship.prototype.stateManager = function() {
  var self = this;
  var states = {
    fly: function(state) {
      self.curState = "fly";
    },
    stop: function(state) {
      self.curState = "stop";
      this.angle = self.angle;
    },
    destroy: function(state) {
      self.parent.removeChild(self);
    }
  };

  var changeState = function(state) {
    // console.log(this);
    states[state]();
  };
  return {
    changeState: changeState
  }
};
Spaceship.prototype.signalManager = function() {
  var self = this;
  return {
    receive: function(id, cmd) {
      if (self !== cmd && self.id == id) {
        self.stateManager().changeState(cmd);
      }
    }
  };
};


//Initialize SpaceshipControl
function SpaceshipControl(options) {
  const el = options.el;
  const spaceship = options.spaceship;
  this.el = el;
  this.spaceship = spaceship;
  this.command = '';
  var id = null;
  var cmd = null;
  // this.cmdName = commander;
  var mediator = new Mediator(spaceship);
  const fly = el.querySelector('.fly');
  fly.onclick = function() {
    var cmdName = $(this).attr("class");
    id = $(this).parent().index();
    cmd = cmdName;
    mediator.send(id, cmd);
  };
  const stop = el.querySelector('.stop');
  stop.onclick = function() {
    var cmdName = $(this).attr("class");
    id = $(this).parent().index();
    cmd = cmdName;
    mediator.send(id, cmd);
  };
  const destroy = el.querySelector('.destroy');
  destroy.onclick = function() {
    var cmdName = $(this).attr("class");
    id = $(this).parent().index();
    cmd = cmdName;
    var ev = event.target;
    ev.parentNode.style.display = "none";
    mediator.send(id, cmd);
  };
}

const stage = new Stage({
  el: document.getElementById("universe"),
});

const addCtrl = document.querySelector(".add");
var shiptypeSelect = document.querySelector("#shiptype");
var fuelsysSelect = document.querySelector("#fuelsys");

var i = 0;
var id = 0;
addCtrl.onclick = function() {
  const velocity = shiptype[shiptypeSelect.value].velocity;
  const fuelAddVel = fuelsys[fuelsysSelect.value].fuelAddVel;
  const fuelReduceVel = shiptype[shiptypeSelect.value].fuelReduceVel;
  if (i > 3) i = 0;
  //Ship create div
  const el = document.createElement('div');
  el.className = "ship";
  el.innerHTML = 100;
  //Ship instantiate
  const spaceship = new Spaceship({
    // id: ("0000" + Number(id).toString(2)).slice(-4),
    id: id + 1,
    el,
    radius: spaceships[i].radius,
    centerX: 399,
    centerY: 245,
    velocity,
    fuelAddVel,
    fuelReduceVel,
    curState: "stop",
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
};

function Mediator(spaceship) {
  this.spaceship = spaceship;
  return{
    send: function(id, cmd) {
    // function send(id,cmd){
      var self = this;
      var success = Math.random() > 0.5 ? true : false;
      if (success) {
        spaceship.signalManager().receive(id, cmd);
        log("command send success");
      } else {
        log("command send failure,we are trying again");
        var callback = function(){
          self.send(id,cmd);
        };
        setTimeout(callback,200);
      }
    },
  }
}


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



