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
  let cityMoment = now.clone().tz(city);

  let localMoment = now.clone().tz(local);
  let diff = cityMoment.utcOffset() - localMoment.utcOffset();
  let diffHours = diff / 60;

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
