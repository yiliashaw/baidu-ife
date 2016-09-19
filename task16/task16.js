/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.querySelector("#aqi-city-input");
  var aqi = document.querySelector("#aqi-value-input");
  var str = city.value.trim();
  var num = aqi.value.trim();
  var re_str = /[^a-zA-Z\u4e00-\u9fa5\s]/g;
  var re_num = /^\d+$/g;
  if(re_str.test(str)){
    alert("城市名必须为中英文字符");
  }else if(!re_num.test(num)){
    alert("空气质量指数必须要为大于或等于0的整数")
  } else {
    aqiData[str]=num;
  }
  return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqiTable = document.querySelector("#aqi-table");
  aqiTable.innerHTML="";
  //tHead
  var key = Object.keys(aqiData);
 if(key.length > 0){
    // 创建tbody
    // var aqiTbody = document.createElement("tbody");
    // aqiTable.appendChild(aqiTbody);
    // for(i = 0 ; i <= key.length;i++){
    //   aqiTbody.insertRow(i);
    //   for(j = 0; j < 3; j++){
    //     aqiTbody.rows[i].insertCell(j);
    //   }
    //   if(i == 0){
    //     aqiTbody.rows[0].cells[0].appendChild(document.createTextNode("城市"));
    //     aqiTbody.rows[0].cells[1].appendChild(document.createTextNode("空气质量"));
    //     aqiTbody.rows[0].cells[2].appendChild(document.createTextNode("操作"));
    //   }else {
    //     aqiTbody.rows[i].cells[0].appendChild(document.createTextNode(key[i-1]));
    //     aqiTbody.rows[i].cells[1].appendChild(document.createTextNode(aqiData[key[i-1]]));
    //     var aqiBtn = document.createElement("button");
    //     aqiBtn.innerHTML="Delete";
    //     aqiTbody.rows[i].cells[2].appendChild(aqiBtn);
    //   }
    // }
  var trows = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
  for(key in aqiData){
    trows +="<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button>删除</button></td></tr>"
  }
   aqiTable.innerHTML=trows;
   }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var el = event.target;
  var delCity = el.parentNode.parentNode.firstElementChild.innerHTML
  delete aqiData[delCity];
  renderAqiList();
}

function init() {
  var addBtn = document.querySelector("#add-btn");
  var aqiTable = document.querySelector("#aqi-table");
  addBtn.addEventListener("click",addBtnHandle,false);
  aqiTable.addEventListener("click",delBtnHandle,false);

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();