// Search Button
function search(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
  let units = "metric";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  search(city);
}

search("Mexico City");

let searchStart = document.querySelector("#searchClick");
searchStart.addEventListener("click", handleSubmit);

function getCityTemperature(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentWeather").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

// Date format
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()]; // 0 and 6
  return `${day} ${hours}:${minutes}`;
}
let dateInput = document.querySelector("#current-date");
let now = new Date();

dateInput.innerHTML = formatDate(now);

// Current Position

function showPosition(position) {
  let latitudeValue = position.coords.latitude;
  let longitudeValue = position.coords.longitude;
  let apiLink = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
  let units = "metric";
  let apiUrl = `${apiLink}lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getCityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#searchCurrent");
currentLocation.addEventListener("click", getCurrentLocation);
