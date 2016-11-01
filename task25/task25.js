const collapsed = document.querySelectorAll(".collapsed");
const nav = document.querySelector(".nav");
const container = document.querySelector("#container");
const searchbtn = document.querySelector("#submit");
const addsibling = document.querySelector("#addsibling");
const addchild = document.querySelector("#addchild");
const deletenode = document.querySelector("#deletenode");
const afirstmenu = document.querySelectorAll(".level1");

var el = null;
var treeNodes = [nav];
var orderList = [];
var input_search = document.querySelector(".input-search");


//iterator
function iteratorTraverse(treeNodes) {
  if (!treeNodes || !treeNodes.length) return;
  for (let i = 0; i < treeNodes.length; i++) {
    var childs = treeNodes[i].children;
    orderList.push(treeNodes[i]);
    if (childs && childs.length > 0) {
      iteratorTraverse(childs);
    }
  }
}

//menu collapse
function menuCollapse() {
  containerReset();
  var nodes = event.target.parentNode; //li
  if (nodes.className == "panel collapsed" && nodes.children[1] && nodes.children[1].offsetParent === null && nodes.children[1].tagName === 'UL') {
    event.target.style.background = "url(images/expand-up.svg) 200px 5px no-repeat"
    event.target.style.backgroundSize = "24px";
    nodes.children[1].style.display = 'block';
  } else if (nodes.className == "panel collapsed" && nodes.children[1] && nodes.children[1].offsetParent !== null) {
    event.target.style.backgroundColor = 'transparent';
    nodes.children[1].style.display = 'none';
    event.target.style.background = "url(images/expand-down.svg) 200px 5px no-repeat"
    event.target.style.backgroundSize = "24px";
  }
}

//right click
function rightClick() {
  el = event.target;
  console.log(el, el.className);
  event.returnValue = false;
  let re = /level/i;
  if (event.target.className.search(re) > -1) {
    container.style.display = "block";
    container.style.left = event.clientX + 3 + 'px';
    container.style.top = event.clientY + 'px';
  }
}

function containerReset() {
  container.style.display = "none";
}

//search
function wordSearch() {
  reset();
  if (!input_search.value) {
    alert("please enter the word you want to search.");
  } else {
    let arr = [];
    let str = input_search.value;
    let re = new RegExp(str, 'i');
    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].tagName === "A") {
        arr.push(orderList[i]);
      }
    }
    let item = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].textContent.search(re) > -1) {
        arr[i].parentNode.parentNode.style.display = "block";
        arr[i].style.backgroundColor = "#ddd";
        item++;
      }
    }
    if (item === 0) alert("Not Found.")
  }
}

//reset
function reset() {
  orderList = [];
  iteratorTraverse(treeNodes);
  for (let i = 0; i < orderList.length; i++) {
    orderList[i].style.backgroundColor = "transparent";
    if (orderList[i].className === "collapse") {
      orderList[i].style.display = "none";
    }
  }
}
//addsibling
function addSibling() {
  containerReset();
  let nodeName = prompt("pls enter your node name", "");
  if (nodeName === "") {
    alert("node name cannot be empty.");
  } else {
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    liEl.className = el.parentNode.className;
    aEl.href = "#intro";
    aEl.className = el.className;
    aEl.textContent = nodeName;
    liEl.appendChild(aEl);
    el.parentNode.parentNode.appendChild(liEl);
  }
}

//adddchild
function addChild() {
  containerReset();
  let nodeName = prompt("pls enter your node name", "");
  if (nodeName === "") {
    alert("node name cannot be empty.");
  } else {
    var tail = (Number(el.className.slice(-1)) + 1).toString();
    var liEl = document.createElement("li");
    var aEl = document.createElement("a");
    aEl.href = "#intro";
    aEl.className = "level" + tail;
    aEl.textContent = nodeName;
    liEl.appendChild(aEl);
    var ulEl = el.parentNode.children[1];
    if (ulEl) {
      ulEl.appendChild(liEl);
      ulEl.style.display = "block";
    } else {
      ulEl = document.createElement("ul");
      ulEl.className = "collapse";
      ulEl.appendChild(liEl);
      el.parentNode.appendChild(ulEl);
      ulEl.style.display = "block";
    }
  }
}
//deletenode
function deleteNode() {
  let node = el.parentNode.parentNode;
  node.removeChild(el.parentNode);
}

//afirstmenu backgroundchanger
function bgChange() {
  let el = event.target;
  for (let i = 0; i < afirstmenu.length; i++) {
    if (el == afirstmenu[i]) {
      el.style.background = "url(images/expand-down.svg) 200px 5px no-repeat";
      el.style.backgroundSize = "24px";
    }
  }
}
function bgChange1() {
  let el = event.target;
  for (let i = 0; i < afirstmenu.length; i++) {
    if (el == afirstmenu[i]) {
      el.style.background = "none";
    }
  }
}
function init() {
  nav.addEventListener("click", menuCollapse, false);
  document.addEventListener("contextmenu", rightClick, false);
  document.addEventListener("click", containerReset, false);
  searchbtn.addEventListener("click", wordSearch, false);
  addsibling.addEventListener("click", addSibling, false)
  addchild.addEventListener("click", addChild, false)
  deletenode.addEventListener("click", deleteNode, false);
  nav.addEventListener("mouseover", bgChange, false);
  nav.addEventListener("mouseout", bgChange1, false);
}
init();