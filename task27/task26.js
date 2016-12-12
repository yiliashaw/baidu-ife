var drawing = document.querySelector("#drawing");
//初始化对象
var obj = {
    s1: null,
    s2: null,
    s3: null,
    s4: null
  }
  //模拟丢包率（30%丢包率）
var getRandom = function() {
  var num = Math.floor(Math.random() * 100);
  return num < 30 ? false : true;
}


//TRACKS funciton ,canvas
function drawCircle(r) {
  if (drawing.getContext) {
    var context = drawing.getContext("2d");
    context.beginPath();
    context.arc(399, 245, r, 0, 2 * Math.PI, false);
    context.strokeStyle = "#ddd";
    context.stroke();
  }
}
//spaceship flying function
// var t = 0;

// function flying1(r, obj) {
//   t = t + (0.44 / r);
//   var centerX = 399; // center of universe
//   var centerY = 245;
//   var x = centerX + r * Math.cos(t) - 15;
//   var y = centerY + r * Math.sin(t) - 15;
//   obj.css({
//     left: x + 'px',
//     top: y + 'px',
//     background: "linear-gradient(to bottom, #fff, #333)",
//   });
// }

// function update1() {
//   flying1(110, $("#spaceship1"));
//   setTimeout(update1, 16);
// }




//CONSTUCTOR FUNCTION
function SpaceShip(id) {
  this.id = id;
  this.objN = "#spaceship" + this.id;
  this.state = "stopped";
  this.r = id * 40 + 70;
  this.angle = 0;
  this.timer = null;
  this.energy = 100;
}

//METHOD
SpaceShip.prototype.flying = function() {
  // console.log("hello");
  this.angle = this.angle + (2 / this.r);
  this.energy = this.energy - 0.3;
  var centerX = 399; // center of universe
  var centerY = 245;
  var x = centerX + this.r * Math.cos(this.angle) - 15;
  var y = centerY + this.r * Math.sin(this.angle) - 15;
  $(this.objN).css({
    left: x + 'px',
    top: y + 'px',
    // background: "linear-gradient(to bottom, #fff, #333)",
  });
};

SpaceShip.prototype.update111 = function() {
  clearTimeout(this.timer);
  var that = this;
  var callback = function() {
    that.update111();
  }
  $(this.objN).text(Math.floor(this.energy));
  if ($(this.objN).text() == "0") {
    return;
  }
  this.flying();
  this.timer = setTimeout(callback, 16);
}

SpaceShip.prototype.energyCal = function() {
  // for (i = 0; i < 100; i++) {

    i++;
    var that = this;
    $(that.objN).text(i);
    if(i<100){
      setTimeout(energyCal ,16);
    }
  // }
}



/*---------------------EVENT----------------------------*/

//flying function callback
// function update() {
//   var arr = Object.keys(obj);
//   for (prop in obj) {
//     //console.log(prop);
//     if (obj[prop] !== null && obj[prop].state === "flying") {
//       obj[prop].flying();
//     }
//   }
//   setTimeout(update, 16);
// }

//Init
function init() {
  var arr = [110, 150, 190, 230];
  arr.forEach(function(item) {
    drawCircle(item);
  });

  //  update();

  //EVENT FUNCTION
  function eventFunc(ev, name, fn) {
    return $(ev).each(function(index) {
      $(ev).eq(index).bind(name, fn);
    })
  }

  // eventFunc(".create", "click", function() {
  //       if (obj["s" + (index * 1 + 1)] !== null) {
  //         alert("飞船还在轨道上噢~");
  //       } else {
  //         $("#spaceship" + (index * 1 + 1)).css({
  //           display: "block",
  //         });
  //         obj["s" + (index * 1 + 1)] = new SpaceShip(index + 1);

  //       }
  //     });
  //CREATE
  $(".create").each(function(index) {
      $(".create").eq(index).bind("click", function() {
        if (obj["s" + (index * 1 + 1)] !== null) {
          alert("飞船还在轨道上噢~");
        } else {
          $("#spaceship" + (index * 1 + 1)).css({
            display: "block",
          });
          obj["s" + (index * 1 + 1)] = new SpaceShip(index + 1);
        }
      })
    })
    //FLY
  $(".fly").each(function(index) {
      $(".fly").eq(index).bind("click", function() {
        if (obj["s" + (index * 1 + 1)] !== null) {
          obj["s" + (index * 1 + 1)].state = "flying";
          obj["s" + (index * 1 + 1)].update111();

        } else {
          alert("请先创建~");
        }
      })
    })
    //STOP
  $(".stop").each(function(index) {
      $(".stop").eq(index).bind("click", function() {
        if (obj["s" + (index * 1 + 1)] !== null) {
          clearTimeout(obj["s" + (index * 1 + 1)].timer);
        } else {
          alert("请先创建~");
        }
      })
    })
    //DESTROY
  $(".destroy").each(function(index) {
    $(".destroy").eq(index).bind("click", function() {
      obj["s" + (index * 1 + 1)] = null;
      $("#spaceship" + (index * 1 + 1)).css({
        display: "none",
      });
    })
  })



}

init();