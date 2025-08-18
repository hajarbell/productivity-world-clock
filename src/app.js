let count = 0;
let maxcount = 10;
let tasks = [];
console.log(tasks);
console.log(count);

function handleSubmit(task, done = false, index) {
  if (tasks.length < maxcount) {
    let checkList = document.querySelector("#check-list");
    let isChecked = done ? "checked" : "";
    let isdoneClass = done ? "done" : "";

    checkList.innerHTML += ` <form action="" class="check-list-items" data-index = "${index}">
                    <input type="checkbox" name="task-check" class="check" ${isChecked}/>
                    <input type="text"  name="task-input" class="to-do-item ${isdoneClass}" value="${task}" />
                  </form> `;
  } else {
    alert("Sorry, you've hit max tasks limit!");
  }
  count++;
  updatecount();
}

function updatecount() {
  let countDisplay = document.querySelector(".number-of-items");
  countDisplay.innerHTML =
    tasks.length < 2 ? `${tasks.length} item` : `${tasks.length} items`;
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

new Typewriter("#on-board-msg", {
  strings: "Welcome you!",
  autoStart: true,
  cursor: null,
  delay: 100,
});

let toDoListElement = document.querySelector(".full-to-do-list");
toDoListElement.addEventListener("change", (e) => {
  let eventInfo = e.target;
  if (eventInfo.classList.contains("check")) {
    let form = e.target.closest(".check-list-items");
    let checkedIndex = parseInt(form.dataset.index);
    let parentForm = e.target.parentElement;
    let checkedTask = parentForm.querySelector(".to-do-item");
    checkedTask.classList.toggle("done", e.target.checked);

    tasks[checkedIndex].done = e.target.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

toDoListElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target.closest(".check-list-items");
  console.log(form);
  let index = Number(form.dataset.index);
  console.log(index);
  let input = form.querySelector('input[type= "text"]');
  tasks[index].text = input.value;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(input.value);
});

let deleteAll = document.querySelector(".footer-to-do-list");
deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#check-list").innerHTML = "";
  count = 0;
  document.querySelector(".number-of-items").innerHTML = "0 item";
  localStorage.removeItem("tasks");
});

let now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function handleClick(direction) {
  if (direction === "next") {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  } else if (direction === "prev") {
    currentMonth--;

    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
  }
  calendarUpdate();
}

function renderCal(i, currentDay, isCurrentMonth) {
  let isToday = isCurrentMonth && i === currentDay;
  let highlightDay = isToday ? "today" : "";
  return `<div class="cal-day ${highlightDay}" ><div class="num">${i}</div></div>`;
}

let prev = document.getElementById("prev");
let next = document.getElementById("next");

prev.addEventListener("click", () => handleClick("prev"));
next.addEventListener("click", () => handleClick("next"));

function calendarUpdate() {
  let yearMonths = [
    { month: "January" },
    { month: "February" },
    { month: "March" },
    { month: "April" },
    { month: "May" },
    { month: "June" },
    { month: "July" },
    { month: "August" },
    { month: "September" },
    { month: "October" },
    { month: "November" },
    { month: "December" },
  ];
  let today = new Date();
  let currentDay = today.getDate();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let theCurrentMonth = document.getElementById("month");
  let theCurrentYear = document.getElementById("year");
  let isCurrentMonth =
    currentMonth === today.getMonth() && currentYear === today.getFullYear();
  theCurrentMonth.innerHTML = yearMonths[currentMonth].month;
  theCurrentYear.innerHTML = currentYear;

  let daysOftheMonth = document.querySelector(".month-days");
  daysOftheMonth.innerHTML = "";
  for (let i = 1; i <= daysInMonth; i++) {
    daysOftheMonth.innerHTML += renderCal(i, currentDay, isCurrentMonth);
  }
}

calendarUpdate();

let lastTimeChecked = new Date();
lastTimeChecked.setHours(0, 0, 0, 0);
setInterval(() => {
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  if (now.getTime() !== lastTimeChecked.getTime()) {
    lastTimeChecked = now;
    calendarUpdate();
  }
}, 60000);

function renderClockImg(imgSelector, time) {
  console.log(time);
  let clockBg = document.querySelector(imgSelector);
  let hour = moment().tz(time).hour();
  let isNight = hour >= 20 || hour < 6;

  clockBg.classList.remove("day", "night");
  clockBg.classList.add(isNight ? "night" : "day");
}
let timerId = null;

function updateInfo(city) {
  let time = document.getElementById("current-time");
  let formattedTime = moment().tz(city).format("H:mm:ss A");
  let cityName = city.split("/").pop().replace("_", " ");
  let currentCity = document.getElementById("current-city");
  let formattedDate = moment().tz(city).format("ddd MMM DD");
  let date = document.getElementById("current-date");
  let local = moment.tz.guess();
  let formattedLocalTime = moment().tz(local).format("H:mm:ss A");
  let localCurrentTime = document.getElementById("local-time");
  let formattedCurrentDate = moment().tz(local).format("ddd MMM DD");
  let localCurrentDate = document.getElementById("local-date");
  let formattedLocalCity = local.split("/").pop().replace("_", " ");
  let localCity = document.getElementById("local-city");
  let timeDifference = document.getElementById("time-difference");
  renderClockImg(".bg-img-one", city);
  renderClockImg(".bg-img-two", moment.tz.guess());
  let now = moment();
  let localtiming = now.clone().tz(local);
  let universalTiming = now.clone().tz(city);

  let diffMinutes = universalTiming.utcOffset() - localtiming.utcOffset();
  let diffHours = diffMinutes / 60;

  let sign =
    diffHours > 0
      ? `+${diffHours} hours`
      : diffHours < 0
      ? `-${Math.abs(diffHours)} hours`
      : "Same time";

  time.innerHTML = formattedTime;
  currentCity.innerHTML = cityName;
  date.innerHTML = formattedDate;
  localCurrentTime.innerHTML = formattedLocalTime;
  localCurrentDate.innerHTML = formattedCurrentDate;
  localCity.innerHTML = formattedLocalCity;
  timeDifference.innerHTML = sign;
}

function calenderToggle() {
  calendarBtn.addEventListener("click", (e) => {
    let calendarSelect = document.getElementById("calendar");
    calendarSelect.classList.toggle("hidden");
  });
}
function toDoListToggle() {}
let calendarBtn = document.getElementById("calendar-btn");
let todoBtn = document.getElementById("to-do-btn");

function themeChanger() {
  let lightMode = document.querySelector(".light");
  lightMode.addEventListener("click", (e) => {
    if (lightMode.classList.contains("transparent")) {
      lightMode.classList.remove("transparent");
      lightMode.classList.add("active");
      darkMode.classList.remove("active");
      darkMode.classList.add("transparent");
    }
    let backGroundTheme = document.querySelector(".overlay");
    backGroundTheme.classList.remove("dark-mode");
  });

  let darkMode = document.querySelector(".dark");
  darkMode.addEventListener("click", (e) => {
    if (darkMode.classList.contains("transparent")) {
      darkMode.classList.remove("transparent");
      lightMode.classList.remove("active");
      lightMode.classList.add("transparent");
      darkMode.classList.add("active");
    }
    let backGround = document.querySelector(".overlay");
    backGround.classList.add("dark-mode");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const getFromLocalStorage = () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
      count = tasks.filter((tasks) => !tasks.done).length;
      handleSubmit(task.text, task.done, index);
    });
  };
  getFromLocalStorage();
  let defaultCity = "Europe/Amsterdam";
  updateInfo(defaultCity);
  timerId = setInterval(() => updateInfo(defaultCity), 1000);
  let citiesDropDown = document.getElementById("cities-dropdown");
  citiesDropDown.addEventListener("change", (e) => {
    e.preventDefault();
    let cityChosen = e.target.value;

    updateInfo(cityChosen);
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => updateInfo(cityChosen), 1000);
  });

  let toDoListInput = document.getElementById("adding-items-searchbar");
  toDoListInput.addEventListener("submit", (e) => {
    e.preventDefault();
    let userInput = document.getElementById("add-input");
    let toDoItem = userInput.value.trim();

    if (toDoItem.length > 0) {
      tasks.push({ text: toDoItem, done: false });
      handleSubmit(toDoItem, false, tasks.length - 1);
      saveToLocalStorage();
      userInput.value = "";
    } else {
      alert("Please enter a task");
    }
  });
  calenderToggle();
  toDoListToggle();
  themeChanger();

  updatecount();
});
