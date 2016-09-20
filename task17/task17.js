/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

//计算百分比
const calcPercent = (num, total) =>
  (num / total * 100) + '%';

//取到月份
const getMonth = str =>
  str.slice(0, 7);

const randomColor = () =>
  '#' + ('000000' + Math.round(Math.random() * 0xffffff).toString(16)).slice(-6);

const escapeHTML = str => {
  str = String(str);
  const map = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
  };
  // for (let i = str.length - 1; i > -1; --i) {
  //   const char = str[i];
  //   if (map.hasOwnProperty(char)) {
  //     str = str.slice(0, i) + map[char] + str.slice(i + 1);
  //   }
  // }
  // return str;
  return str.replace(/[\<\>&"']/g, match => {
    return map[match];
  });
};

const template = str => {
  const tmp = document.createElement('div');
  return data => {
    tmp.innerHTML = str.replace(
      /`([^`]+)`/g,
      (match, group1) =>
        data.hasOwnProperty(group1) ? escapeHTML(data[group1]) : match
    );
    return tmp.firstElementChild;
  };
};

const templateEl = template(
  '<div class=item tooltip="`tooltip`" style="height:`height`;background-color:`bg`"></div>'
);

const createEl = (date, aqi) => {
  return templateEl({
    // text: '<script>',
    tooltip: date + " : " + aqi.toFixed(2),
    height: calcPercent(aqi, 700),
    bg: randomColor()
  });
  // const div = document.createElement("div");
  // div.className = "item";
  // div.setAttribute("tooltip", date + " : " + aqi.toFixed(2));
  // div.style.height = calcPercent(aqi, 700);
  // div.style.backgroundColor = randomColor();
  // return div;
};

const interval = ["日", "周", "月"];
const wrapper = document.querySelector("#aqi-chart-wrap");
/**
 * 渲染图表
 */
function renderChart() {
  const city = document.querySelector("#city-select").value;
  const chartData = aqiSourceData[city];
  const arr = Object.keys(chartData).sort(); //把年月日先排个序，Object.keys取出来的属性顺序不一定是对的
  wrapper.innerHTML = "";  //初始化wrapper
  const title = document.createElement("h3");
  title.className = "chart-title";
  wrapper.appendChild(title);

  /* ----------日视图-------------- */
  if (pageState.nowGraTime == "day") {
    wrapper.className = "day-view";
    title.textContent = city + "每" + interval[0] + "空气质量统计情况"
    for (let i = 0; i < arr.length; i++) {
      const div = createEl(arr[i], chartData[arr[i]]);
      // const div = document.createElement("div");
      // div.className = "item";
      // div.setAttribute("tooltip", arr[i] + ":" + chartData[arr[i]]);
      // div.style.height = calcPercent(chartData[arr[i]], 700);
      // div.style.backgroundColor = randomColor();
      // div.style.title = "dqt";
      wrapper.appendChild(div);
    }
    /*----------周视图--------------*/
  } else if (pageState.nowGraTime == "week") {
    wrapper.className = "week-view";
    title.textContent = city + "每" + interval[1] + "空气质量统计情况"
    // const weeks = Math.ceil(arr.length / 7);
    // for (let i = 0; i < weeks; i++) {
    //   let aqiTotal = 0;
    //   const daysOfWeek = i === weeks - 1 ? (arr.length - i * 7) : 7;
    //   for (let j = 0; j < daysOfWeek; j++) {
    //     aqiTotal += chartData[arr[i * 7 + j]];
    //   }
    //   const avg = aqiTotal / daysOfWeek;
    //   const div = document.createElement("div");
    //   div.className = "item";
    //   div.setAttribute("tooltip", "第" + (i + 1) + "周:" + avg.toFixed(2));
    //   div.style.height = calcPercent(avg, 700);
    //   div.style.backgroundColor = randomColor();
    //   wrapper.appendChild(div);
    // }
    const date = new Date(1970, 0, 1);
    const getWeekDay = str => {
      const year = parseInt(str.slice(0, 4), 10);
      const month = parseInt(str.slice(5, 7), 10);
      const day = parseInt(str.slice(-2), 10);
      date.setFullYear(year);
      date.setMonth(month - 1);
      date.setDate(day);
      // const date = new Date(year, month - 1, day);
      return date.getDay();
    };

    let total = 0;
    let days = 0;
    // let currentWeek = getWeek(arr[0]);
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      total += chartData[item];
      days += 1;
      const isEnd = i === arr.length - 1;
      // const week = isEnd ? null : getWeek(arr[i + 1]);
      if (isEnd || getWeekDay(item) === 6) {
        // currentWeek = week;
        const avg = total / days;
        total = 0;
        days = 0;
        const div = createEl(item, avg);
        // const div = document.createElement("div");
        // div.className = "item";
        // div.style.height = calcPercent(avg, 700);
        // div.style.backgroundColor = randomColor();
        wrapper.appendChild(div);
      }
    }


    /*----------月视图--------------*/
  } else if (pageState.nowGraTime == "month") {
    title.textContent = city + "每" + interval[2] + "空气质量统计情况"
    wrapper.className = "month-view";
    // let aqiMonth = 0;
    // let days = 0;
    // let currentMonth = getMonth(arr[0]);
    // for (let i = 0; i < arr.length; i++) {
    //   const item = arr[i];
    //   aqiMonth += chartData[item];
    //   days += 1;
    //   const isEnd = i === arr.length - 1;
    //   const month = isEnd ? null : getMonth(arr[i + 1]);
    //   if (isEnd || month !== currentMonth) {
    //     currentMonth = month;
    //     const avg = aqiMonth / days;
    //     aqiMonth = 0;
    //     days = 0;
    //     const div = document.createElement("div");
    //     div.className = "item";
    //     div.setAttribute("tooltip", getMonth(arr[i]) + "月:" + avg.toFixed(2));
    //     div.style.height = calcPercent(avg, 700);
    //     div.style.backgroundColor = randomColor();
    //     wrapper.appendChild(div);
    //   }
    // }

    const months = {} // {month: [aqiSum, days]}
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const month = getMonth(item);
      if (!months.hasOwnProperty(month)) {
        months[month] = [0, 0];
      }
      const data = months[month];
      data[0] = data[0] + chartData[item];
      data[1] = data[1] + 1;
    }

    const m = Object.keys(months).sort();
    for (let i = 0; i < m.length; ++i) {
      const month = m[i];
      const [aqiSum, days] = months[month];
      const avg = aqiSum / days;
      const div = createEl(month, avg);
      // const div = document.createElement("div");
      // div.className = "item";
      // div.setAttribute("tooltip", month + "月:" + avg.toFixed(2));
      // div.style.height = calcPercent(avg, 700);
      // div.style.backgroundColor = randomColor();
      wrapper.appendChild(div);

    }

  }






}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  const graTime = document.querySelector("input[name='gra-time']:checked").value;
  // if (graTime === "day") {
  //   pageState.nowGraTime = "day";
  // } else if (graTime === "week") {
  //   pageState.nowGraTime = "week";
  // } else if (graTime === "month") {
  //   pageState.nowGraTime = "month";
  // }
  pageState.nowGraTime = graTime;
  console.log(pageState.nowGraTime);
  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  renderChart();

}

/**
 * 初始化函数
 */
function init() {
  const graTimeChan = document.querySelector("#form-gra-time");
  const cityChan = document.querySelector("#city-select");
  graTimeChan.addEventListener("change", graTimeChange, false);
  cityChan.addEventListener("change", citySelectChange, false);
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();