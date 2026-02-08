function openSource() {
  let elems = document.querySelectorAll(".elems");
  let fullElems = document.querySelectorAll(".fullElems");
  let backBtn = document.querySelectorAll(".fullElems .back");

  elems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElems[elem.id].style.display = "block";
    });
  });

  backBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElems[back.id].style.display = "none";
    });
  });
}

openSource();

function todoList() {
  let input = document.querySelector(".addTask input");
  let textarea = document.querySelector(".addTask textarea");
  let addtask = document.querySelector(".addTask button");
  let showtask = document.querySelector(".showTask");
  let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  renderTasks();

  addtask.addEventListener("click", function (e) {
    e.preventDefault();

    let listTask = input.value.trim();
    let detailTask = textarea.value.trim();

    if (listTask === "") {
      alert("Please enter a valid task !!");
      return;
    }
    tasks.push({
      title: listTask,
      detail: detailTask,
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));

    renderTasks();

    input.value = "";
    textarea.value = "";
  });
  function renderTasks() {
    showtask.innerHTML = "";

    tasks.forEach((task, index) => {
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      taskDiv.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.detail}</p>
        <button class="done">Task Done</button>
      `;
      taskDiv.querySelector(".done").addEventListener("click", function () {
        tasks.splice(index, 1);
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
        renderTasks();
      });

      showtask.appendChild(taskDiv);
    });
  }
}

todoList();

function dailyplanner() {
  var dayplanner = document.querySelector(".day-planner");
  var dayplandata = JSON.parse(localStorage.getItem("dayplandata")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholedaysum = "";
  hours.forEach((elem, idx) => {
    var saveddata = dayplandata[idx] || "";
    wholedaysum =
      wholedaysum +
      `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value="${saveddata}">
  </div>`;
  });
  dayplanner.innerHTML = wholedaysum;

  let dayplannerinput = document.querySelectorAll(".day-planner input");

  dayplannerinput.forEach((elem) => {
    elem.addEventListener("input", function () {
      dayplandata[elem.id] = elem.value;
      localStorage.setItem("dayplandata", JSON.stringify(dayplandata));
    });
  });
}

dailyplanner();

function motivationalQuotes() {
  let motivationdesc = document.querySelector(".motivation-desc h2");
  let motivationauthor = document.querySelector(".motivation-desc h1");

  async function fetchQuote() {
    let res = await fetch("https://api.quotable.io/random");
    let data = await res.json();
    motivationdesc.innerHTML = data.content;
    motivationauthor.innerHTML = data.author;
  }

  fetchQuote();
}

motivationalQuotes();

function fomoDoroTimer() {
  let timer = document.querySelector(".fomo-timer h2");
  let startBtn = document.querySelector(".fomo-all-buttons .start");
  let pauseBtn = document.querySelector(".fomo-all-buttons .pause");
  let resetBtn = document.querySelector(".fomo-all-buttons .reset");
  let session = document.querySelector(".fomo-timer .session");
  let isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timeInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds)}`;
  }

  function startTimer() {
    clearInterval(timeInterval);

    if (isWorkSession) {
      timeInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timeInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "---Break Time---";
          session.style.backgroundColor = "#f74df7";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timeInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timeInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "---Session Time---";
          session.style.backgroundColor = "#60d448";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timeInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timeInterval);
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

fomoDoroTimer();

function dailyGoals() {
  let form = document.querySelector(".daily-goals-form form");
  let input = form.querySelector("input");
  let showGoals = document.querySelector(".show-daily-goals");

  let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  showAllGoals();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let goalText = input.value.trim();

    if (goalText === "") {
      alert("Goal likh bhai 😅");
      return;
    }

    goals.push(goalText);

    localStorage.setItem("dailyGoals", JSON.stringify(goals));

    showAllGoals();

    input.value = "";
  });

  function showAllGoals() {
    showGoals.innerHTML = "";

    goals.forEach(function (goal, index) {
      let goalDiv = document.createElement("div");
      goalDiv.classList.add("showgoals");

      goalDiv.innerHTML = `
      <h2>${goal}</h2>
      <button>DONE</button>
    `;
      goalDiv.querySelector("button").addEventListener("click", function () {
        goals.splice(index, 1);
        localStorage.setItem("dailyGoals", JSON.stringify(goals));
        showAllGoals();
      });

      showGoals.appendChild(goalDiv);
    });
  }
}

dailyGoals();

function landingPage() {
  let apiKey = "75b704eea2ed4ad28db123436260702";
  let city = "Patna";

  let temp = document.querySelector(".temp h1");
  let condition = document.querySelector(".temp h2");
  let heatindex = document.querySelector(".humi .heat");
  let humidity = document.querySelector(".humi .humidity");
  let speed = document.querySelector(".humi .speed");

  async function apicall() {
    let res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    let data = await res.json();
    console.log(data.current);

    temp.innerHTML = `${data.current.temp_c}°C`;
    condition.innerHTML = `${data.current.condition.text}`;
    heatindex.innerHTML = `Heat Index:${data.current.heatindex_c}%`;
    humidity.innerHTML = `Humidity:${data.current.humidity}%`;
    speed.innerHTML = `Wind Speed:${data.current.wind_kph}km/h`;
  }

  apicall();

  let weatherpage1date = document.querySelector(".day h2");
  let weatherpage1hours = document.querySelector(".day h1");

  let date = null;
  function timeDate() {
    const totalDaysofWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    date = new Date();
    let tarik = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = totalDaysofWeek[date.getDay()];
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    weatherpage1date.innerHTML = `${String(tarik).padStart("2", "0")}-${String(month).padStart("2", "0")}-${String(year).padStart("2", "0")}`;

    if (hours > 12) {
      weatherpage1hours.innerHTML = `${day} , ${String(hours - 12).padStart("2", "0")}:${String(min).padStart("2", "0")}:${String(sec).padStart("2", "0")} PM`;
    } else {
      weatherpage1hours.innerHTML = `${day} , ${String(hours).padStart("2", "0")}:${String(min).padStart("2", "0")}:${String(sec).padStart("2", "0")} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

landingPage();
