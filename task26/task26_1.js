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

//初始化Scene

// function Scene() {
const scene = {
    s1: null,
    s2: null,
    s3: null,
    s4: null
  }
  // }
  //SCENE update


//初始化SpaceShip
//CONSTUCTOR FUNCTION
function SpaceShip(el, r) {
  this.el = el;
  // this.objN = "#" + this.el.id;
  this.x = 399;
  this.y = 245;
  this.r = r;
  // this.velocity = 2;
  // this.fuelVel = 0.02
  this.angle = 0;
  this.fuel = 100;

}
//METHOD
//Update
SpaceShip.prototype.update = function() {
  // console.log("hello");
  clearTimeout(this.timer);
  this.angle += this.velocity / this.r;
  this.fuel = this.fuel - this.fuelVel;
  if (this.fuel <= 30) {
    this.el.style.color = "#ea3c45";
  }
  if(this.fuel<= 0){

  }
  var left = this.x + this.r * Math.cos(this.angle) - 15;
  var top = this.y + this.r * Math.sin(this.angle) - 15;
  this.el.style.left = left + "px";
  this.el.style.top = top + "px";
  this.el.textContent = Math.round(this.fuel);
  // var that = this;
  // var callback = function() {
  //   that.update();
  // }
  // this.timer = setTimeout(callback, 16);
};

//Launch
SpaceShip.prototype.launch = function() {
  this.el.style.top = (this.y - 15) + "px";
  this.el.style.left = (this.x + this.r - 15) + "px";
  this.el.style.display = "block";
};
//Flying
SpaceShip.prototype.fly = function() {
    this.velocity = 2;
    this.fuelVel = 0.02;
    this.update();
  }
  //Stop
SpaceShip.prototype.stop = function() {
    this.velocity = 0;
    this.fuelVel = 0;
    this.update();
  }
  //Destory
SpaceShip.prototype.destroy = function() {
  clearTimeout(this.timer);
  this.el.style.display = "none";
  for (var prop in this) {
    delete this[prop];
  }
}

// SpaceShip.prototype.update111 = function() {
//   clearTimeout(this.timer);
//   var that = this;
//   var callback = function() {
//     that.update111();
//   }
//   $(this.objN).text(Math.floor(this.energy));
//   if ($(this.objN).text() == "0") {
//     return;
//   }
//   this.flying();
//   this.timer = setTimeout(callback, 16);
// }

// SpaceShip.prototype.energyCal = function() {
//   // for (i = 0; i < 100; i++) {

//   i++;
//   var that = this;
//   $(that.objN).text(i);
//   if (i < 100) {
//     setTimeout(energyCal, 16);
//   }
//   // }
// }



/*---------------------EVENT----------------------------*/
//Init
function init() {
  var arr = [110, 150, 190, 230];
  arr.forEach(function(item) {
    drawCircle(item);
  });

  //TEST
  a = new SpaceShip(document.getElementById("spaceship1"), 110);
  a.launch();
  //  update();

  //EVENT FUNCTION
  function eventFunc(ev, name, fn) {
    return $(ev).each(function(index) {
      $(ev).eq(index).bind(name, fn);
    })
  }
  //CREATE

  // $(".create").each(function(index) {
  //     $(".create").eq(index).bind("click", function() {
  //       if (obj["s" + (index * 1 + 1)] !== null) {
  //         alert("飞船还在轨道上噢~");
  //       } else {
  //         $("#spaceship" + (index * 1 + 1)).css({
  //           display: "block",
  //         });
  //         obj["s" + (index * 1 + 1)] = new SpaceShip(index + 1);
  //       }
  //     })
  //   })
  //   //FLY
  // $(".fly").each(function(index) {
  //     $(".fly").eq(index).bind("click", function() {
  //       if (obj["s" + (index * 1 + 1)] !== null) {
  //         obj["s" + (index * 1 + 1)].state = "flying";
  //         obj["s" + (index * 1 + 1)].update111();

  //       } else {
  //         alert("请先创建~");
  //       }
  //     })
  //   })
  //   //STOP
  // $(".stop").each(function(index) {
  //     $(".stop").eq(index).bind("click", function() {
  //       if (obj["s" + (index * 1 + 1)] !== null) {
  //         clearTimeout(obj["s" + (index * 1 + 1)].timer);
  //       } else {
  //         alert("请先创建~");
  //       }
  //     })
  //   })
  //   //DESTROY
  // $(".destroy").each(function(index) {
  //   $(".destroy").eq(index).bind("click", function() {
  //     obj["s" + (index * 1 + 1)] = null;
  //     $("#spaceship" + (index * 1 + 1)).css({
  //       display: "none",
  //     });
  //   })
  // })



}

init();