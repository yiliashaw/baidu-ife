const arr = [];
var input = document.querySelector("#input");
const leftIn = document.querySelector("#left-in");
const rightIn = document.querySelector("#right-in");
const leftOut = document.querySelector("#left-out");
const rightOut = document.querySelector("#right-out");
const display = document.querySelector(".display");

function leftin() {
  if (Number(input.value)) {
    arr.unshift(input.value);
    var div = "";
    for (let i = 0; i < arr.length; i++) {
      div += "<div>" + arr[i] + "</div>";
    }
    display.innerHTML = div;
  } else {
    alert("Number please...")
  }
}

function rightin() {
  if (Number(input.value)) {
    arr.push(input.value);
    var div = "";
    for (let i = 0; i < arr.length; i++) {
      div += "<div>" + arr[i] + "</div>";
    }
    display.innerHTML = div;
  } else {
    alert("Number please...")
  }
}

function leftout() {
  if (display.children.length != 0) {
    display.removeChild(display.firstChild);
    arr.shift();
  }
}
function rightout() {
  if (display.children.length != 0) {
    display.removeChild(display.lastChild);
    arr.pop();
  }
}

function remove(event) {

  var el = event.target;
  display.removeChild(el);
  var i = 0;
  while ((el = el.previousSibling) != null)
    i++;
  arr.splice(i, 1);
  console.log(i);
  // for (let i = display.childNodes.length; i >0;i--){

  // }


}
function init() {
  leftIn.addEventListener("click", leftin, false);
  rightIn.addEventListener("click", rightin, false);
  leftOut.addEventListener("click", leftout, false);
  rightOut.addEventListener("click", rightout, false);
  display.addEventListener("click", remove, false);
}

init();