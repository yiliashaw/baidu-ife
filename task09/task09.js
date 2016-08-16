(function () {

  //calendar

  var yearSelect = document.getElementById("year");
  var monthSelect = document.getElementById("month");
  // var grid = document.getElementsByClassName("cal_day")[0].getElementsByTagName("td");
  var grid = document.querySelectorAll('.cal_day td');
  function onSelectYearMonth() {
    var today = new Date();
    var todayDate = today.getDate();
    var year = parseInt(yearSelect.value, 10);
    var month = parseInt(monthSelect.value, 10);
    var date = new Date(year, month - 1, 0);
    var day = date.getDay();
    grid[day].textContent = 1;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    var bigMonth = [1, 3, 5, 7, 8, 10, 12];
    var smallMonth = [2, 4, 6, 9, 11];
    for (let i = 0; i < 40; i++) {
      const el = grid[i];
      if (i < day) {
        el.textContent = '';
        el.style.border = '';
      } else {
        const _date = 1 + (i - day);
        if (
          (bigMonth.indexOf(month) > -1 && _date > 31) ||
          (smallMonth.indexOf(month) > -1 && _date > 30) ||
          (year % 4 == 0 && month == 2 && _date > 29) ||
          (year % 4 != 0 && month == 2 && _date > 28)
        ) {
          el.textContent = '';
          el.style.border = '';
        }else{
          el.textContent = _date;
          const isToday = year == currentYear && month == currentMonth + 1 && _date === todayDate;
          el.style.border = isToday ? "1px solid #f6c62b" : '';
        }
      }
    }
    //month of 31 day && month of 30 days && February
  }


  var return_Today = document.getElementById("return_today");
  function returnToday() {
    var today = new Date();
    var todayDate = today.getDate();
    yearSelect.value = today.getFullYear();
    monthSelect.value = today.getMonth() + 1;
    onSelectYearMonth();
    // for (let i = 0; i < 40; i++) {
    //   if (grid[i].textContent == todayDate) {
    //     grid[i].style.border = "1px solid #f6c62b";
    //   }
    // }
  }


  // window.onload = (function () {
  onSelectYearMonth();
  returnToday();
  //})()


  return_Today.addEventListener('click', returnToday, false);
  yearSelect.addEventListener('change', onSelectYearMonth, false);
  monthSelect.addEventListener('change', onSelectYearMonth, false);



  //car_brands_ranking
  var value = document.getElementsByClassName("value");
  var son = document.getElementsByClassName("son");
  // var valueNum;
  for (let i = 0; i < value.length; i++) {
    const valueNum = (value[i].innerHTML * 1) / 59393000;
    const el = son[i];
    el.style.width = valueNum * 100 + '%';
    if (valueNum > 0.8) {
      el.style.background = "#ec6d51";
    } else if (valueNum < 0.8 && valueNum > 0.45) {
      el.style.background = "#ef8150";
    } else if (valueNum < 0.45 && valueNum > 0.3894) {
      el.style.background = "#f19e4f";
    } else {
      el.style.background = "#7ecaef";
    }
  }
})();
