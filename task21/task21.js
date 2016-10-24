'use strict'
var arr = [];
var arr_tag = [];
var input_tag = document.querySelector("#tag");
var input = document.querySelector("#input");
const leftIn = document.querySelector("#left-in");
const tag = document.querySelector(".tag-display");
const display = document.querySelector(".display");
const querybtn = document.querySelector("#querybtn");
var queryinput = document.querySelector("#queryinput");

//DOM template
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
    value: height
  });
};

//input ==> arr
var input_arr = function (input) {
  var initArr = input.value.split(/,|;|\n|，|、|\t|\s+/g);
  var finalArr = [];
  for (let i = initArr.length - 1; i >= 0; i--) {
    if (initArr[i].length > 0 && finalArr.indexOf(initArr[i]) === -1) {
      finalArr.unshift(initArr[i]);
    }
  }
  return finalArr.length > 10 ? finalArr.slice(-10, finalArr.length) : finalArr;
};


//add tag
function addTag(dp, ar, textin) {
  dp.innerHTML = "";
  ar = input_arr(textin);
  for (let i = 0; i < ar.length; i++) {
    const div = createEl(ar[i]);
    dp.appendChild(div);
  }
}

//mouseover event
function addDelete(event) {
  if (event.target.className === "item") {
    const str = event.target.innerHTML;
    event.target.textContent = "删除" + str;
  }
}

//mouse move out
function reomveDelete(event) {
  if (event.target.className === "item") {
    var str = event.target.textContent;
    event.target.textContent = str.slice(2);
  }
}
//delete tag
function deleteTag(event) {
  var parent = event.target.parentNode;
  if (event.target.className === "item") {
    parent.removeChild(event.target);
  }

}

//query
function strQuery() {
  var re = RegExp(queryinput.value, 'g');
  var queryArr = input_arr(input);
  for (let i = 0; i < queryArr.length; i++) {
    display.children[i].innerHTML = queryArr[i].replace(re, "<span>" + queryinput.value + "</span>");
  }
  return display;
}

function init() {
  leftIn.addEventListener("click", function () { addTag(display, arr, input) }, false);
  querybtn.addEventListener("click", strQuery, false);
  input_tag.addEventListener("change", function () { addTag(tag, arr_tag, input_tag) }, false);
  tag.addEventListener("mouseover", addDelete, false);
  tag.addEventListener("mouseout", reomveDelete, false);
  tag.addEventListener("click", deleteTag, false);
  display.addEventListener("mouseover", addDelete, false);
  display.addEventListener("mouseout", reomveDelete, false);
  display.addEventListener("click", deleteTag, false);

}

init();