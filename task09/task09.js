(function(){

//calendar

var yearSelect = document.getElementById("year");
var monthSelect = document.getElementById("month");
var grid = document.getElementsByClassName("cal_day")[0].getElementsByTagName("td");
function onSelectYearMonth(){
  var year = yearSelect[yearSelect.selectedIndex].value;
  var month = monthSelect[monthSelect.selectedIndex].value
  var date = new Date(year,month-1,0);
  var day = date.getDay();
  grid[day].innerHTML=1;
  for (let i = 0 ; i < 40 ; i ++) {
    if(i<day){
      grid[i].innerHTML='';
      grid[i].style.border="none";
    } else {
       grid[i].innerHTML=1+(i-day);
       grid[i].style.border="none"
    }
  }
  //month of 31 day && month of 30 days && February
  var bigMonth=['1','3','5','7','8','10','12'];
  var smallMonth=['2','4','6','9','11'];
  var gridNum =[];
  var yearNum = parseInt(year,10);
  for (let i =0; i< 40; i++ ){
    gridNum[i] = parseInt(grid[i].innerHTML,10);
    if ((bigMonth.indexOf(month) >-1 && gridNum[i]>31) ||(smallMonth.indexOf(month)>-1 && gridNum[i]>30) || (yearNum % 4 == 0 && month == '2' && gridNum[i]>29) ||( yearNum % 4 != 0 && month == '2'  && gridNum[i]>28)) grid[i].innerHTML='';
  }
}


var return_Today = document.getElementById("return_today");
function returnToday(){
  var today = new Date();
  var todayDate=today.getDate();
  yearSelect.value = today.getFullYear();
  monthSelect.value = today.getMonth()+1;
  onSelectYearMonth();
  for(let i = 0 ; i < 40; i++){
    if(grid[i].innerHTML==todayDate ){
      grid[i].style.border="1px solid #f6c62b";
    }
  }
}


window.onload = (function(){
  onSelectYearMonth();
  returnToday();
})()


  return_Today.addEventListener('click', returnToday, false);
  yearSelect.addEventListener('change', onSelectYearMonth, false);
  monthSelect.addEventListener('change', onSelectYearMonth, false);



//car_brands_ranking
  var value = document.getElementsByClassName("value");
  var son = document.getElementsByClassName("son");
  var valueNum=[];
  for( var i=0;i < value.length; i++){
     valueNum.push((value[i].innerHTML*1)/59393000);
     son[i].style.width=valueNum[i]*100+'%';
     if(valueNum[i]>0.8){
       son[i].style.background="#ec6d51";
     }else if(valueNum[i]<0.8 && valueNum[i]>0.45){
       son[i].style.background="#ef8150";
     }else if(valueNum[i]<0.45 && valueNum[i]>0.3894){
       son[i].style.background="#f19e4f";
     }else {
       son[i].style.background="#7ecaef";
     }
  }
})();
