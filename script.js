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

  addtask.addEventListener("click", function (e) {
    e.preventDefault();

    let listTask = input.value.trim();
    let detailTask = textarea.value.trim();

    if (listTask === "") {
      alert("Please enter a valid task !! ");
      return;
    }

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <h2>${listTask}</h2>
        <p>${detailTask}</p>
        <button class="done">Task Done</button>
    `;

    showtask.appendChild(taskDiv);

    let del = taskDiv.querySelector(".done");
    del.addEventListener("click", function () {
      taskDiv.remove();
    });

    input.value = "";
    textarea.value = "";
  });
}
 todoList()

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

dailyplanner()