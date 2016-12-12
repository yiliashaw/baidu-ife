const iterator = document.querySelector(".iterator");
const breadth = document.querySelector(".breadth");
const depth = document.querySelector(".depth");
const breadth_search = document.querySelector(".breadth-search");
const depth_search = document.querySelector(".depth-search");
const supper = document.querySelector(".supper");
var input = document.querySelector(".search");
var treeNodes = [supper];
var orderList = [];
var timer = null;

//iterator
function iteratorTraverse(treeNodes) {
  if (!treeNodes || !treeNodes.length) return;
  var len = treeNodes.length;
  for (let i = 0; i < len; i++) {
    var childs = treeNodes[i].children;
    orderList.push(treeNodes[i]);
    if (childs && childs.length > 0) {
      iteratorTraverse(childs);
    }
  }
}

//breadth
function breadthTraverse(treeNodes) {
  if (!treeNodes || !treeNodes.length) return;
  var len = treeNodes.length;
  var stack = [];
  for (let i = 0; i < len; i++) {
    stack.push(treeNodes[i]);
  }
  var item;
  while (stack.length) {
    item = stack.shift();
    orderList.push(item);
    if (item.children && item.children.length) {
      var arr = Array.prototype.slice.call(item.children);
      stack = stack.concat(arr);
    }
  }
}

//depth
function depthTraverse(treeNodes) {
  if (!treeNodes || !treeNodes.length) return;
  var len = treeNodes.length;
  var stack = [];
  for (let i = 0; i < len; i++) {
    stack.push(treeNodes[i]);
  }
  var item;
  while (stack.length) {
    item = stack.shift();
    orderList.push(item);
    if (item.children && item.children.length) {
      var arr = Array.prototype.slice.call(item.children);
      stack = arr.concat(stack);
    }
  }
}

//search
function search() {
  if (input.value != "") {
    var str = input.value;
    for (let i = 0; i < orderList.length; i++) {
      var re = new RegExp(str, 'i');
      var str1 = orderList[i].childNodes[0].textContent;
      if (str1.search(re) > -1) {
        orderList[i].style.backgroundColor = "#fc0";
        return;
      }
    }
  }
}


//changeColor
function changColor() {
  var i = 0;
  orderList[i].style.backgroundColor = "#9DAA6A";
  timer = setInterval(function() {
    if (i < orderList.length - 1) {
      i++;
      orderList[i].style.backgroundColor = "#9DAA6A";
      orderList[i - 1].style.backgroundColor = "#fff";
    } else if (i == orderList.length - 1) {
      clearInterval(timer);
      orderList[orderList.length - 1].style.backgroundColor = "#fff";
    }
  }, 300)
}

//reset
function reset() {
  clearInterval(timer);
  for (let i = 0; i < orderList.length; i++) {
    orderList[i].style.backgroundColor = "#fff";
  }
  orderList = [];

}

function init() {
  iterator.addEventListener("click", function() {
    reset();
    iteratorTraverse(treeNodes);
    changColor();
  }, false);
  breadth.addEventListener("click", function() {
    reset();
    breadthTraverse(treeNodes);
    changColor();
  }, false);
  depth.addEventListener("click", function() {
    reset();
    depthTraverse(treeNodes);
    changColor();
  }, false);
  breadth_search.addEventListener("click", function() {
    reset();
    breadthTraverse(treeNodes);
    search();
  }, false)
  depth_search.addEventListener("click", function() {
    reset();
    depthTraverse(treeNodes);
    search();
  }, false)
}
init();