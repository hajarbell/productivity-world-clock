let selectedCity = null;

function updateInfo() {
  if (!selectedCity) return;
  console.log(selectedCity);
  let formattedTime = moment().tz(selectedCity).format("h:mm:ss A");
  console.log(formattedTime);
  let currentTime = document.getElementById("current-time");
  currentTime.innerHTML = formattedTime;
}

document.addEventListener("DOMContentLoaded", () => {
  let citiesShown = document.getElementById("cities-dropdown");
  console.log(citiesShown);
  citiesShown.addEventListener("change", (e) => {
    selectedCity = e.target.value;

    updateInfo();
  });
  setInterval(updateInfo, 1000);
});
updateInfo("Asia/Tokyo");
