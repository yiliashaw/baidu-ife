'use strict'
var arr = [];
var input = document.querySelector("#input");
const leftIn = document.querySelector("#left-in");
// const rightIn = document.querySelector("#right-in");
// const leftOut = document.querySelector("#left-out");
// const rightOut = document.querySelector("#right-out");
const display = document.querySelector(".display");
const querybtn = document.querySelector("#querybtn");
var queryinput = document.querySelector("#queryinput");


// var textOnChange = function () {
//   var inputValue = Number(input.value);
//   if (!inputValue) {
//     alert("请输入数字");
//     return false;
//   } else if (inputValue < 10 || inputValue > 100) {
//     alert("数字必须在10到100之间");
//     return false;
//   } else if (arr.length >= 60) {
//     alert("不能超过60个")
//     return false;
//   } else {
//     return true;
//   }
// };

const template = function (str) {
  const tmp = document.createElement("div");
  return function (data) {
    tmp.innerHTML = str.replace(
      /`([^`]+)`/g,
      function (match, grp1) {
        return data.hasOwnProperty(grp1) ? data[grp1] : match;
      }
    );
    return tmp.firstElementChild;
  }
};
var templateEl = template('<div class=item>`value`</div>');
const createEl = function (height) {
  return templateEl({
    // height: (height / 100) * 100 + "%",
    value: height
  });
};

var input_arr = function () {
  var initArr = input.value.split(/,|;|\n|，|\t|\s+/g);
  var finalArr = [];
  for (let i = 0; i < initArr.length; i++) {
    if (initArr[i].length > 0) {
      finalArr.push(initArr[i]);
    }
  }
  return finalArr;
};

// function deleteBlankArr() {
//   var arr1 = arr.replace(/\s+/g,'');
// }

function leftin() {
  display.innerHTML = "";
  arr = input_arr();
  for (let i = 0; i < arr.length; i++) {
    const div = createEl(arr[i]);
    display.appendChild(div);
  }
}

function strQuery(){
  var re = RegExp(queryinput.value,'g');
  for(let i = 0 ; i<arr.length; i++ ){
    display.children[i].innerHTML = arr[i].replace(re,"<span>"+queryinput.value+"</span>");
  }
  return display;
}
// function rightin() {
//   var inputValue = Number(input.value);
//   if (textOnChange()) {
//     arr.push(inputValue);
//     display.innerHTML = "";
//     for (let i = 0; i < arr.length; i++) {
//       const div = createEl(arr[i]);
//       display.appendChild(div);
//     }

//   }
// }

// function leftout() {
//   if (display.children.length != 0) {
//     display.removeChild(display.firstChild);
//     arr.shift();
//   }
// }

// function rightout() {
//   if (display.children.length != 0) {
//     display.removeChild(display.lastChild);
//     arr.pop();
//   }
// }

// function remove(event) {
//   var el = event.target;
//   display.removeChild(el);
//   var i = 0;
//   while ((el = el.previousSibling) != null)
//     i++;
//   arr.splice(i, 1);
// }



function init() {
  leftIn.addEventListener("click", leftin, false);
  querybtn.addEventListener("click", strQuery, false);
  // rightIn.addEventListener("click", rightin, false);
  // leftOut.addEventListener("click", leftout, false);
  // rightOut.addEventListener("click", rightout, false);
  //display.addEventListener("click", remove, false);

}

init();