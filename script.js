//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = "d0f8a8fc77158dd6c4aa3d46d038afea";
const URL = `https://api.openweathermap.org/data/2.5/weather?`;
const KELVIN = 273;
let tempUnit = "celsius";
let city = "Mumbai";

const iconEl = document.querySelector(".details img");
const temperatureEl = document.querySelector(".temperature");
const descriptionEl = document.querySelector(".description");
const citycountryEl = document.querySelector(".current-city-country");
const notificationEl = document.querySelector(".notification");

const inputCityEl = document.querySelector(".input-city");
const inputSearchEl = document.querySelector(".input-search");

const changeTempUnit = function () {
  if (tempUnit === "celsius") {
    tempUnit = "fahrenhite";

    const tempInfahrenhite = Math.round(
      (Number(temperatureEl.childNodes[0].data.split(" ")[0]) * 9) / 5 + 32
    );

    temperatureEl.childNodes[0].textContent = `${tempInfahrenhite} ° `;
    temperatureEl.children[0].textContent = "F";
  } else if (tempUnit === "fahrenhite") {
    tempUnit = "celsius";
    // temperatureEl.childNodes[0].data = `${temp}° `;
    // (32°F − 32) × 5/9 = 0°C
    const tempIncelsius = Math.round(
      (+temperatureEl.childNodes[0].data.split(" ")[0] - 32) * (5 / 9)
    );
    temperatureEl.childNodes[0].textContent = `${tempIncelsius} ° `;
    temperatureEl.children[0].textContent = "C";
  }
};

temperatureEl.addEventListener("click", changeTempUnit);

const showError = function (error) {
  notificationEl.textContent = error.message;
  notificationEl.style.display = "block";
};

const getWeatherData = async function (lat, lon) {
  // const response = await fetch(`${URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCityEl.value}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    // throw new Error("City not found");
    console.log(data);

    let { temp } = data.main;
    temp = Math.floor(temp - KELVIN);
    const { description, icon } = data.weather[0];
    const { name } = data;
    const { country } = data.sys;

    iconEl.setAttribute("src", `./icons/${icon}.png`);
    // temperatureEl.textContent = `${temp}`;
    temperatureEl.childNodes[0].data = `${temp} ° `;
    descriptionEl.textContent = description;
    citycountryEl.textContent = `${name}, ${country}`;

    console.log(temp, description, icon, name, country);
  } catch (err) {
    showError(err);
  }
};

const getPosition = function (position) {
  notificationEl.style.display = "none";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  getWeatherData(lat, lon);
};

const showLocationError = function (error) {
  notificationEl.textContent = "Please turn on location";
  notificationEl.style.display = "block";
};

const fetchWeatherData = function () {
  if (inputCityEl.value === "") return;

  navigator.geolocation.getCurrentPosition(getPosition, showLocationError);
};

inputSearchEl.addEventListener("click", fetchWeatherData);

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
