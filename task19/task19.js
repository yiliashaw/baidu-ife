const arr = [];
var input = document.querySelector("#input");

const leftIn = document.querySelector("#left-in");
const rightIn = document.querySelector("#right-in");
const leftOut = document.querySelector("#left-out");
const rightOut = document.querySelector("#right-out");
const display = document.querySelector(".display");

var textOnChange = function () {
  var inputValue = Number(input.value);
  if (!inputValue) {
    alert("请输入数字");
    return false;
  } else if (inputValue < 10 || inputValue > 100) {
    alert("数字必须在10到100之间");
    return false;
  } else if (arr.length >= 60) {
    alert("不能超过60个")
    return false;
  } else {
    return true;
  }
};

const template = function (str) {
  const tmp = document.createElement("div");
  return function (data) {
    tmp.innerHTML = str.replace(
      /`([^`]+)`/g, function (match, grp1) {
        return data.hasOwnProperty(grp1) ? data[grp1] : match;
      }
    );
    return tmp.firstElementChild;
  }
};
var templateEl = template('<div class=item  style="height:`height`">`value`</div>');
const createEl = function (height) {
  return templateEl({
    height: (height / 100) * 100 + "%",
    value:height
  }
  );
};
function leftin() {
  var inputValue = Number(input.value);
  if (textOnChange()) {
    arr.unshift(inputValue);
    display.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      const div = createEl(arr[i]);
      display.appendChild(div);
    }

  }
}

function rightin() {
  var inputValue = Number(input.value);
  if (textOnChange()) {
    arr.push(inputValue);
    display.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      const div = createEl(arr[i]);
      display.appendChild(div);
    }

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
}



function init() {
  leftIn.addEventListener("click", leftin, false);
  rightIn.addEventListener("click", rightin, false);
  leftOut.addEventListener("click", leftout, false);
  rightOut.addEventListener("click", rightout, false);
  display.addEventListener("click", remove, false);

}

init();