//声明变常量
const stu_type = document.getElementsByName("type");
const info = document.getElementsByClassName("info");
const city = document.querySelector(".city");
const school = document.querySelector(".school");

window.onload = function () {
  for (let i = 0; i < stu_type.length; i++) {
    stu_type[i].addEventListener("click", display, false);
  }
  city.addEventListener("change",selectorUpdate,false);
};


//根据学生类型选择显示函数
function display() {
  for (let i = 0; i < stu_type.length; i++) {
    if (stu_type[i].checked) {
      for (let j = 0; j < info.length; j++) {
        info[j].style.display = "none";
        if (i === j) {
          info[j].style.display = "block"
        }
      }
    }
  }
}

// Data
var cityArr = [];
cityArr['default'] = [
  {txt:'--请选择--',val:'default'}
];
cityArr['Beijing'] = [
  {txt:'北京大学',val:'Peking'},
  {txt:'清华大学',val:'Tsinghua'}
];
cityArr['Shanghai'] = [
  {txt:'复旦大学',val:'Fudan'},
  {txt:'交通大学',val:'Jiaotong'}
];

//创建option函数
function Option(options){
  var txt = options.txt;
  var val = options.val;
  var el = document.createElement("option");
  el.value = val;
  el.textContent = txt;
  school.appendChild(el);
}

//第二个下拉框更新函数
function selectorUpdate(){
  while(school.firstChild){
    school.removeChild(school.firstChild);
  }
  var cityValue = city.value;
  cityArr[cityValue].forEach(function(item,index,array){
    Option(item);
  });
  }



