const year = document.querySelector("#year");
const month = document.querySelector("#month");
const monthDay = document.querySelector("#month-day");
//生成日历格子
function createEl() {
  while (monthDay.firstChild) {
    monthDay.removeChild(monthDay.firstChild);
  }
  for (let i = 0; i < 6; i++) {
    var tr = document.createElement("tr");
    tr.className = "month-row";
    var innerHtml = "";
    for (let j = 0; j < 7; j++) {
      innerHtml += "<td class='day'></td>";
    }
    tr.innerHTML = innerHtml;
    monthDay.appendChild(tr);
  }
}

//初始化年和月的可选项
const yearSelect = document.querySelector("#year-to-select");
const monthSelect = document.querySelector("#month-to-select");

function yearMonthSelect() {
  for (let i = 0; i < 15; i++) {
    var div = document.createElement("div");
    div.className = "year-select";
    div.textContent = 2010 + i + " 年";
    yearSelect.appendChild(div);
  }
  for (let i = 0; i < 12; i++) {
    var div = document.createElement("div");
    div.className = "month-select";
    div.textContent = 1 + i + " 月";
    monthSelect.appendChild(div);
  }
}
//选择年事件
function yearClick() {
  if (yearSelect.style.display === "block") {
    yearSelect.style.display = "none";
  } else {
    yearSelect.style.display = "block";
    monthSelect.style.display = "none";
  }
  const years = document.querySelectorAll(".year-select");
  for (let i = 0; i < years.length; i++) {
    years[i].addEventListener("click", function () {
      year.textContent = years[i].textContent;
      yearSelect.style.display = "none";
      createEl();
      render(getValue(year), getValue(month));
    }, false);
  }
}
//选择月份事件
function monthClick() {
  if (monthSelect.style.display === "block") {
    monthSelect.style.display = "none";
  } else {
    monthSelect.style.display = "block";
    yearSelect.style.display = "none";
  }
  const months = document.querySelectorAll(".month-select");
  for (let i = 0; i < months.length; i++) {
    months[i].addEventListener("click", function () {
      month.textContent = months[i].textContent;
      monthSelect.style.display = "none";
      createEl();
      render(getValue(year), getValue(month));
    }, false);
  }
}
//左箭头事件
const preMonth = document.querySelector("#preMonth");

function arrowLeft() {
  var newMonth = getValue(month) === 1 ? 12 : getValue(month) - 1;
  var newYear = getValue(month) === 1 ? getValue(year) - 1 : getValue(year);
  year.textContent = newYear + " 年";
  month.textContent = newMonth + " 月";
  createEl();
  render(newYear, newMonth);
}
//右箭头事件
const nextMonth = document.querySelector("#nextMonth");

function arrowRight() {
  var newMonth = getValue(month) === 12 ? 1 : getValue(month) + 1;
  var newYear = getValue(month) === 12 ? getValue(year) + 1 : getValue(year);
  year.textContent = newYear + " 年";
  month.textContent = newMonth + " 月";
  createEl();
  render(newYear, newMonth);
}

//取得年、月
function getValue(el) {
  var index = el.textContent.indexOf(" ");
  return el.textContent.slice(0, index) * 1;
}

const bigMonth = [1, 3, 5, 7, 8, 10, 12];
const smallMonth = [2, 4, 6, 9, 11];

//计算某个月的天数
function getDaysofMonth(year, month) {
  if (bigMonth.indexOf(month) > -1) {
    return 31;
  } else if (month === 2 && isLeapYear(year)) {
    return 29;
  } else if (month === 2 && !isLeapYear(year)) {
    return 28;
  } else {
    return 30;
  }
}
//判断是否是闰年
function isLeapYear(year) {
  return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

//日历渲染
function render(year, month) {
  createEl();
  var days = document.querySelectorAll(".day"); //取到所有td
  var lastDay = getDaysofMonth(year, month); //得到这个月的天数
  var preMonth = month === 1 ? 12 : month - 1; //得到上个月的月份
  var preMonthLastDay = getDaysofMonth(year, preMonth); //得到上个月的最后一天;
  var firstDayObj = new Date(year, month - 1, 1);
  var firstDayOfWeek = firstDayObj.getDay(); //这个月1号是星期几
  //上个月天数灰色显示
  for (let i = 0; i < firstDayOfWeek; i++) {
    days[i].textContent = preMonthLastDay - (firstDayOfWeek - i - 1);
    days[i].className += " pre_month";
    // days[i].style.color = "#ddd";
  }
  //本月天数
  for (let i = firstDayOfWeek; i < firstDayOfWeek + lastDay; i++) {
    days[i].textContent = i - firstDayOfWeek + 1;
    days[i].className += " cur_month";
  }
  //下个月灰色显示
  for (let i = firstDayOfWeek + lastDay; i < days.length; i++) {
    days[i].textContent = i - firstDayOfWeek - lastDay + 1;
    days[i].className += " next_month";
  }
}

//点击日期选择
function daySelect(event) {
  var curMonth = document.querySelectorAll(".cur_month");
  for (let i = 0; i < curMonth.length; i++) {
    if (curMonth[i] === event.target) {
      if (curMonth[i].className.indexOf("selected") > -1) {
        return;
      } else {
        event.target.className += " selected";
        event.target.style.backgroundColor = "#b0dfde";
      }
    } else {
      curMonth[i].className = "day cur_month";
      curMonth[i].style.backgroundColor = "transparent";
    }
  }
}
//切掉到今天
const today = document.querySelector("#today");

function switchToday() {
  var now = new Date();
  var nowYear = now.getFullYear() * 1;
  var nowMonth = now.getMonth() * 1 + 1;
  var nowDay = now.getDate().toString();
  year.textContent = nowYear + " 年";
  month.textContent = nowMonth + " 月";
  createEl();
  render(nowYear, nowMonth);
  const curMonthDays = document.querySelectorAll(".cur_month");
  for (let i = 0; i < curMonthDays.length; i++) {
    if (curMonthDays[i].textContent == nowDay) {
      curMonthDays[i].className += " selected";
    };
  }
  if (event) event.stopPropagation();

}


function init() {
  yearMonthSelect();
  switchToday();
  document.addEventListener("click", daySelect, false);
  year.addEventListener("click", yearClick, false);
  month.addEventListener("click", monthClick, false);
  preMonth.addEventListener("click", arrowLeft, false);
  nextMonth.addEventListener("click", arrowRight, false);
  today.addEventListener("click", switchToday, true);
}

init();