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
DisplayObjectContainer.prototype.update = function(ss) {
  // for (const child of this.children) {
  //   child.update();
  // }
  this.children.forEach(function(child) {
    if (ss === child) {
      child.update();

    }
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
  this.v = this.velocity;
  this.fuelAddVel = fuelAddVel;
  this.fA = this.fuelAddVel;
  this.fuelReduceVel = fuelReduceVel;
  this.fR = this.fuelReduceVel;
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

//ss tracks & fuel
Spaceship.prototype.update = function() {
  if (!this.charging && this.fuel >= 0 && this.curState == "fly") {
    this.setAngle(this.angle);
    this.setFuel(this.fuel);
    this.el.textContent = Math.round(this.fuel);
  } else {
    this.curState = "stop";
    this.charging = true;
    this.fuel += this.fuelAddVel;
    if (this.fuel > 30) {
      this.el.style.color = "#f4f2e8";
    }
    if (this.fuel >= 100) {
      this.charging = false;
      this.curState = "fly";
      console.log(this.fuel);
    }
    this.el.textContent = Math.round(this.fuel);
  }
  this.signalRadiation();
};

//飞船状态管理器
Spaceship.prototype.stateManager = function() {
  var self = this;
  var states = {
    fly: function(state) {
      self.curState = "fly";
      self.velocity = self.v;
      self.fuelAddVel = self.fA;
      self.fuelReduceVel = self.fR;
      self.charging = false;
    },
    stop: function(state) {
      self.curState = "stop";
      self.velocity = 0;
      self.fuelAddVel = 0;
      self.fuelReduceVel = 0;
    },
    destroy: function(state) {
      self.parent.removeChild(self);
    }
  };
  var changeState = function(state) {
    states[state](state);
  };
  return {
    changeState: changeState
  }
};

//飞船信号解析编码，信息与二进制转换
Spaceship.prototype.signalAdapter = function() {
  var self = this;
  return {
    receive: function(signal) {
      var id = parseInt(signal.slice(0, 4), 2);
      var cmd = stateTransfer(signal.slice(-4));
      if (self.curState !== cmd && self.id == id) {
        self.curState = cmd;
        self.stateManager().changeState(cmd);
      }
    },
    send: function() {
      var idCode = ("0000" + self.id.toString(2)).slice(-4);
      var curStateCode = stateTransfer(self.curState);
      var fuelCode = ("00000000" + Math.round(self.fuel).toString(2)).slice(-8);
      return idCode + curStateCode + fuelCode;
    }
  };
};
//飞船信号发射器
Spaceship.prototype.signalRadiation = function() {
  var self = this;
  var signal = self.signalAdapter().send();
  var mediator = new Mediator(self);
  mediator.receive(signal);

};

//Initialize SpaceshipControl，初始化行星控制台
function SpaceshipControl(options) {
  const el = options.el;
  const spaceship = options.spaceship;
  this.el = el;
  this.spaceship = spaceship;
  this.command = '';
  var id = null;
  var cmd = null;
  var adapter = new Adapter(spaceship);
  const fly = el.querySelector('.fly');
  fly.onclick = function() {
    cmd = $(this).attr("class");
    id = $(this).parent().index();
    adapter.encode(id, cmd);
  };
  const stop = el.querySelector('.stop');
  stop.onclick = function() {
    cmd = $(this).attr("class");
    id = $(this).parent().index();
    adapter.encode(id, cmd);
  };
  const destroy = el.querySelector('.destroy');
  destroy.onclick = function() {
    cmd = $(this).attr("class");
    id = $(this).parent().index();
    var ev = event.target;
    ev.parentNode.style.display = "none";
    adapter.encode(id, cmd);
    const tr = document.getElementById(id);
    tr.parentNode.removeChild(tr);
  };
}


//一些初始化变量设置。
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
const shiptypeSelect = document.querySelector("#shiptype");
const fuelsysSelect = document.querySelector("#fuelsys");
var i = 0;
var id = 0;

//添加控制台按钮
addCtrl.onclick = function() {
  const velocity = shiptype[shiptypeSelect.value].velocity;
  const fuelAddVel = fuelsys[fuelsysSelect.value].fuelAddVel;
  const fuelReduceVel = shiptype[shiptypeSelect.value].fuelReduceVel;
  const powerSystem = document.getElementsByName(shiptypeSelect.value);
  const fuelSystem = document.getElementsByName(fuelsysSelect.value);
  if (i > 3) i = 0;
  //Ship create div
  const el = document.createElement('div');
  el.className = "ship";
  el.innerHTML = 100;
  //Ship instantiate
  const spaceship = new Spaceship({
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
  ctrEl.innerHTML = '第' + (i + 1) + '轨道 ' + ("00" + spaceship.id).slice(-2) + '号飞船 ： <button class="fly">FLY</button> <button class="stop">STOP</button> <button class="destroy">DESTROY</button>';
  document.querySelector("#controller").appendChild(ctrEl);
  const ctrl = new SpaceshipControl({
    el: ctrEl,
    spaceship,
  });
  //add monitor
  monitor.style.display = "block";
  const ssMonitor = document.createElement("tr");
  ssMonitor.id = spaceship.id;
  ssMonitor.innerHTML = '<td>' + spaceship.id + '</td><td>' + powerSystem[0].innerText + '</td><td>' + fuelSystem[0].innerText + '</td><td>' + spaceship.curState.toUpperCase() + '</td><td>' + Math.round(spaceship.fuel) + '</td>';
  monitor.appendChild(ssMonitor);
  //Stage addChild
  stage.addChild(spaceship);
  log("Button added sucessful.");
  id++;
  i++;
};


//初始化Adapter，将控制台的命令转化成二进制（encode）。 将飞船的信号转化为对象形式(decode)。
function Adapter(spaceship) {
  this.spaceship = spaceship;
  var mediator = new Mediator(spaceship);
  return {
    encode: function(id, cmd) {
      var signal = ("0000" + id.toString(2)).slice(-4) + stateTransfer(cmd);
      mediator.send(signal);
    },
    decode: function(signal) {
      return {
        id: parseInt(signal.slice(0, 4), 2),
        curState: stateTransfer(signal.slice(4, 8)),
        fuel: parseInt(signal.slice(-8), 2),
      }
    },
  }
}

//BUS介质（Mediator） 发送信息给飞船，运行update函数，以及接收来自飞船的信号
function Mediator(spaceship) {
  this.spaceship = spaceship;
  var timer = null;
  return {
    send: function(signal) {
      var self = this;
      var success = Math.random() > 0.1 ? true : false;
      if (success) {
        spaceship.signalAdapter().receive(signal);
        const update = function() {
          clearTimeout(timer);
          stage.update(spaceship);
          timer = setTimeout(update, 16);
        };
        setTimeout(update, 16);
        log("command send success");
      } else {
        log("command send failure,we are trying again");
        var callback = function() {
          self.send(signal);
        };
        setTimeout(callback, 200);
      }
    },
    receive: function(signal) {
      signalMonitor(spaceship, signal);
    },
  }
}


//通过Adapter解码，并更新table中的数据
const monitor = document.querySelector("#table");
function signalMonitor(spaceship, signal) {
  this.spaceship = spaceship;
  var adapter = new Adapter(spaceship);
  var dc = adapter.decode(signal);
  var ssUpdate = document.getElementById(dc.id);
  ssUpdate.children[3].textContent = dc.curState.toUpperCase();
  ssUpdate.children[4].textContent = dc.fuel;
}


//Log information，控制台信息输出。
const logInfo = document.querySelector(".loginfo");

function log(msg) {
  var time = new Date();
  const pEl = document.createElement('p');
  pEl.className = "log";
  pEl.textContent = time.toLocaleTimeString() + ': ' + msg;
  logInfo.appendChild(pEl);
}


//飞船状态与二进制互转
function stateTransfer(str) {
  switch (str) {
    case "fly":
      return "0001";
    case "stop":
      return "0010";
    case "destroy":
      return "1100";
    case "0001":
      return "fly";
    case "0010":
      return "stop";
    case "1100":
      return "destroy";
  }
}

//Init,初始化函数
function init() {
  var arr = [110, 150, 190, 230];
  arr.forEach(function(item) {
    drawCircle(item);
  });

}
init();