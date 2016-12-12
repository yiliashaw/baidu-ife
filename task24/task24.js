const iterator = document.querySelector(".iterator");
const breadth = document.querySelector(".breadth");
const depth = document.querySelector(".depth");
const breadth_search = document.querySelector(".breadth-search");
const depth_search = document.querySelector(".depth-search");
const supper = document.querySelector(".supper");
const add_input = document.querySelector(".add-input");
const addbtn = document.querySelector(".add");
const deletebtn = document.querySelector(".delete");

var input = document.querySelector(".search");
var treeNodes = [supper];
var orderList = [];
var timer = null;
var chosenNode;
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


/* -----------------------------------------task24----------------------------------------*/
//chosen
function chosen(event) {
  iteratorTraverse(treeNodes);
  reset();
  event.target.style.backgroundColor = "#E2D7A7";
  chosenNode = event.target;
}

//delete node
function deleteNode() {
  if (!chosenNode) {
    alert("Pls choose the NODE that you want to delete..");
  } else {
    var parent = chosenNode.parentNode;
    parent.removeChild(chosenNode);
    chosenNode = null;
  }
}


//add node
function addNode() {
  if (!chosenNode) {
    alert("Pls choose the NODE that you want to insert into..");
  } else if (add_input.value == '') {
    alert("Pls enter something that you want to insert into..");
  } else {
    var parent = chosenNode.parentNode;
    var div = document.createElement('div');
    div.textContent = add_input.value;
    chosenNode.appendChild(div);
  }
}


//onload
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

  supper.addEventListener("click", chosen, false);
  addbtn.addEventListener("click", addNode, false);
  deletebtn.addEventListener("click", deleteNode, false);

}
init();