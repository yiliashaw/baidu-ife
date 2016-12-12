const prebtn = document.querySelector(".pre-order");
const inbtn = document.querySelector(".in-order");
const postbtn = document.querySelector(".post-order");
const treeRoot = document.querySelector(".A");
var orderList = [];
var timer = null;

//pre-order
function preOrder(node) {
  if (!(node == null)) {
    orderList.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}
//in-order
function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.firstElementChild);
    orderList.push(node);
    inOrder(node.lastElementChild);
  }
}
//post-order
function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    orderList.push(node);
  }
}

//change color
function changeColor() {
  var i = 0;
  orderList[i].style.backgroundColor = "#9DAA6A";
  timer = setInterval(function () {
    if (i < orderList.length-1) {
      i++;
      orderList[i].style.backgroundColor = "#9DAA6A";
      orderList[i - 1].style.backgroundColor = "#fff";
    } else {
      clearInterval(timer);
      orderList[orderList.length-1].style.backgroundColor = "#fff";
    }
  } ,500);
}

//reset
function reset(){
  orderList=[];
  clearInterval(timer);
}

//page onload
function init() {
  prebtn.addEventListener("click", function () {
    reset();
    preOrder(treeRoot);
    changeColor();
  }, false);
  inbtn.addEventListener("click", function () {
    reset();
    inOrder(treeRoot);
    changeColor();
  }, false);
  postbtn.addEventListener("click", function () {
    reset();
    postOrder(treeRoot);
    changeColor();
  }, false);
}

init();