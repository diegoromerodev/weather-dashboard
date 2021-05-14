/* eslint-disable no-console */
/* eslint-disable func-names */
import "regenerator-runtime/runtime";

import "./styles.css";

import weatherData from "./weatherData";
import {
  displayCurrentWeather,
  displayMoreInfo,
  displayWeeklyWeather,
} from "./displayWeather";

import { getCoordinates, getWeather } from "./fetchAPI";

(function initialSetup() {
  const fontAwesome = document.createElement("script");
  fontAwesome.setAttribute(
    "src",
    "https://use.fontawesome.com/releases/v5.15.3/js/all.js"
  );
  document.body.prepend(fontAwesome);

  document.body.innerHTML = `
        <header id="header">
                <div class="container">
                    <h2>WTH WEATHER.</h2>
                    <form id="query-form">
                        <input id="city-field" type="text" placeholder="Enter your city">
                        <button type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <p id="current-unit" class="btn circle-btn">°F</p>
                </div>
        </header>
        <div id="loading-bar"></div>
    `;
  const main = document.createElement("main");
  main.id = "weather-info";
  document.body.append(main);
})();

// Search elements
const queryForm = document.getElementById("query-form");
const cityField = document.getElementById("city-field");
const submitBtn = queryForm.querySelector("button[type='submit']");
submitBtn.setAttribute("type", "submit");
queryForm.append(cityField, submitBtn);
const loadingBar = document.querySelector("#loading-bar");
const changeUnits = document.querySelector("#current-unit");

// In charge of calling all the functions to display the weather
async function displayWeather(query) {
  loadingBar.classList.add("animating");

  let city;
  let weather;
  let cityInfo;
  let cityName;
  let countryName;

  try {
    city = await getCoordinates(query);
    weather = await getWeather(city);
    cityInfo = city.display_name.split(", ");
    [cityName, countryName] = [cityInfo[0], cityInfo[cityInfo.length - 1]];
  } catch {
    document.getElementById("weather-info").innerHTML =
      "ERROR 404 - PLEASE RELOAD THE PAGE";
    return;
  }

  displayCurrentWeather(
    cityName,
    countryName,
    Math.round(weather.current.temp),
    weather.current.weather[0].main
  );

  displayWeeklyWeather(weather);

  displayMoreInfo(weather);
  loadingBar.classList.remove("animating");
}

// EVENT LISTENERS FOR HEADER
queryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  displayWeather(cityField.value);
});

changeUnits.addEventListener("click", function convertUnits() {
  if (this.textContent === "°F") {
    this.textContent = "°C";
    weatherData.currentUnit = "metric";
    displayWeather(weatherData.lastSearch);
  } else {
    this.textContent = "°F";
    weatherData.currentUnit = "imperial";
    displayWeather(weatherData.lastSearch);
  }
});

displayWeather("Caracas");
