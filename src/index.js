let currentDate = new Date();
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();

let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];
let today = daysOfWeek[currentDate.getDay()];
let currentDayTime = document.querySelector("#day-and-time");

let apiKey = "81f588335a184bb4f630e556fc1d7402";
let searchBar = document.querySelector("#search-bar");
let searchSubmit = document.querySelector("#city-search");
let currentLocBtn = document.querySelector("#current-location");

currentDayTime.innerHTML = `${today} ${hour}:${minute}`;

function displayWeather(response) {
  console.log("working");
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
}

let currentTemp = "N/A";
let tempDisplay = document.querySelector("#temp-display");
tempDisplay.innerHTML = currentTemp;

function setFarenheit() {
  let farenheit;
  farenheit = currentTemp * 2 + 30;
  tempDisplay.innerHTML = farenheit;
  return farenheit;
}

function setCelsius() {
  let celsius;
  celsius = response.main.data.temp;
  tempDisplay.innerHTML = celsius;
  return celsius;
}

let changeToFarenheit = document.querySelector("#farenheit");
changeToFarenheit.addEventListener("click", setFarenheit);

let changetoCelsius = document.querySelector("#celsius");
changetoCelsius.addEventListener("click", setCelsius);

function searchByCoords(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByCoords);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = searchBar.value.toLowerCase();
  console.log(city);
  search(city);
}

function logSearch(event) {
  event.preventDefault();
  console.log(searchBar.value);
}

searchSubmit.addEventListener("submit", handleSubmit);
currentLocBtn.addEventListener("click", getCurrentLocation);
