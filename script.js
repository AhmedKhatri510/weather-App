//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const API_KEY = "d0f8a8fc77158dd6c4aa3d46d038afea";
const URL = `https://api.openweathermap.org/data/2.5/weather?`;
const KELVIN = 273;

const iconEl = document.querySelector(".details img");
const temperatureEl = document.querySelector(".temperature");
const descriptionEl = document.querySelector(".description");
const citycountryEl = document.querySelector(".current-city-country");
const notificationEl = document.querySelector(".notification");

const getWeatherData = async function (lat, lon) {
  const response = await fetch(`${URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await response.json();

  console.log(data);

  let { temp } = data.main;
  temp = Math.floor(temp - KELVIN);
  const { description, icon } = data.weather[0];
  const { name } = data;
  const { country } = data.sys;

  iconEl.setAttribute("src", `./icons/${icon}.png`);
  // temperatureEl.textContent = `${temp}`;
  temperatureEl.childNodes[0].data = `${temp}° `;
  descriptionEl.textContent = description;
  citycountryEl.textContent = `${name}, ${country}`;

  console.log(temp, description, icon, name, country);
};

const getPosition = function (position) {
  notificationEl.style.display = "none";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  getWeatherData(lat, lon);
};

const showError = function (error) {
  notificationEl.textContent = "Please turn on location";
  notificationEl.style.display = "block";
};

navigator.geolocation.getCurrentPosition(getPosition, showError);
