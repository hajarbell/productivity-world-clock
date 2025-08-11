function calendarUpdate() {
  let yearMonths = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 },
  ];
  let now = new Date();

  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();
  let currentDay = now.getDate();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
  }
  for (let i = 1; i < daysInMonth; i++) {
    let daysOftheMonth = document.querySelector(".month-days");
    let theCurrentMonth = document.getElementById("month");
    let theCurrentYear = document.getElementById("year");
    let calendarDays = document.getElementsByClassName("num");
    let currentWeekDay = moment([currentDay]);
    daysOftheMonth.innerHTML += `<div class="cal-day"><div class="num">${i}</div></div>`;
    theCurrentMonth.innerHTML = yearMonths[currentMonth].month;
    theCurrentYear.innerHTML = currentYear;

    let theCurrentDays = document.querySelectorAll(".num");
    for (let day of theCurrentDays) {
      if (parseInt(day.textContent) === currentDay) {
        day.parentElement.style.backgroundColor = "pink";
      }
    }
  }
}

calendarUpdate();
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

  let difference = console.log(formattedLocalCity);
  time.innerHTML = formattedTime;
  currentCity.innerHTML = cityName;
  date.innerHTML = formattedDate;
  localCurrentTime.innerHTML = formattedLocalTime;
  localCurrentDate.innerHTML = formattedCurrentDate;
  localCity.innerHTML = formattedLocalCity;
  timeDifference.innerHTML = sign;
}

document.addEventListener("DOMContentLoaded", () => {
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
});
