import date from "date-and-time";

import weatherData from "./weatherData";

function displayCurrentWeather(city, country, temp, weather) {
  const main = `
    <div id="current-weather">
      <div class="left-column-current">
        <h2 class="city-name">${city}</h2>
        <h4 class="country-name">${country}</h4>
      </div>
      <img class="weather-icon" src="${
        weatherData.iconsUrl[weather] || weatherData.iconsUrl.Else
      }"/>
      <div class="right-column-current">
        <h3 class="current-degrees">${temp}°</h3>
        <h4 class="sensation">${weather}</h4>
      </div>
    </div>`;
  document.querySelector("#weather-info").innerHTML = main;
}

function displayWeeklyWeather({ daily }) {
  const now = new Date();
  const dayHTML = daily
    .map((currDay, i) => {
      const plusDate = date.addDays(now, i);
      if (i >= 5) return;
      // eslint-disable-next-line consistent-return
      return ` 
        <div class="daily-1 day-block">
            <h3 class="day-name">${
              i === 0 ? "Today" : date.format(plusDate, "dddd")
            }</h3>
            <h3 class="day-temp">${Math.round(currDay.temp.day)}°</h3>
            <img class="day-weather" src="${
              weatherData.iconsUrl[currDay.weather[0].main] ||
              weatherData.iconsUrl.Else
            }" />
        </div>
        ${i < 4 ? '<div class="vertical-line"></div>' : ""}`;
    })
    .join("\n");

  const dailyParent = `
    <div id="daily-weather">
      <h2 class="caption">Daily Forecast</h3>
      <div class="weather-days">
        ${dayHTML}
      </div>
    </div>
    `;
  document
    .querySelector("#weather-info")
    .insertAdjacentHTML("beforeend", dailyParent);
}

function displayMoreInfo({ current }) {
  const moreInfo = `<div id="more-info">
    <h3 class="more-info-caption">More Info</h3>
    <div class="horizontal-line"></div>
      <div class="humidity w-info">
        <div class="caption-container">
          <img class="w-info-thumb" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9Il8yMi1odW1pZGl0eSIgZGF0YS1uYW1lPSIyMi1odW1pZGl0eSI+PGcgaWQ9ImdseXBoIj48Y2lyY2xlIGN4PSIzMDQiIGN5PSIyNTYiIHI9IjEyIi8+PGNpcmNsZSBjeD0iMjE2IiBjeT0iMTgwIiByPSIxMiIvPjxwYXRoIGQ9Im0zNDkuODg0IDExNC4xOTRjLTQyLjA2LTYxLjA4NS04My40NjItMTA0LjY1NS04NS4yLTEwNi40OGExMiAxMiAwIDAgMCAtMTcuMzYyIDBjLTEuNzQxIDEuODI1LTQzLjE0MyA0NS40LTg1LjIgMTA2LjQ4LTU3LjE0OCA4Mi45OTQtODYuMTIyIDE1NC45MjgtODYuMTIyIDIxMy44MDYgMCA5OS4yNTIgODAuNzQ4IDE4MCAxODAgMTgwczE4MC04MC43NDggMTgwLTE4MGMwLTU4Ljg3OC0yOC45NzQtMTMwLjgxMi04Ni4xMTYtMjEzLjgwNnptLTkuODg0IDE0MS44MDZhMzYgMzYgMCAxIDEgLTM2LTM2IDM2LjA0IDM2LjA0IDAgMCAxIDM2IDM2em0tMzYuNDg1LTk2LjQ4NWExMiAxMiAwIDAgMSAxNi45NyAxNi45N2wtMTEyIDExMmExMiAxMiAwIDAgMSAtMTYuOTctMTYuOTd6bS04Ny41MTUtMTUuNTE1YTM2IDM2IDAgMSAxIC0zNiAzNiAzNi4wNCAzNi4wNCAwIDAgMSAzNi0zNnptNDAgMzE2Yy03Mi43ODUgMC0xMzItNTkuMjE1LTEzMi0xMzIgMC0xLjM0NS4wMjgtMi43MDguMDctNC4wNzggOS4zMDYtNC43NCAxNC44MTUtMTEuOTIyIDMxLjUtMTEuOTIyIDI0Ljg4OCAwIDI0Ljg4OCAxNiA0OS43NzYgMTZzMjQuODg5LTE2IDQ5Ljc3OC0xNiAyNC44ODggMTYgNDkuNzc2IDE2IDI0Ljg4Ny0xNiA0OS43NzQtMTZjMTcuNzE2IDAgMjIuODI3IDguMSAzMy4yNzUgMTIuNzc2LjAyNiAxLjA3OS4wNTUgMi4xNjEuMDU1IDMuMjI0LS4wMDQgNzIuNzg1LTU5LjIxOSAxMzItMTMyLjAwNCAxMzJ6Ii8+PC9nPjwvZz48L3N2Zz4=" />
          <h3 class="info-caption">Humidity</h3>
        </div>
        <h3 class="info-data">${current.humidity}%</h3>
      </div>
      <div class="horizontal-line"></div>
      <div class="feels-like w-info">
        <div class="caption-container">
          <img class="w-info-thumb" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9Il8yNy1sb2NhdGlvbiIgZGF0YS1uYW1lPSIyNy1sb2NhdGlvbiI+PGcgaWQ9ImdseXBoIj48cGF0aCBkPSJtMTgzLjQ3OCA0Ljc4MmMtOTkuMjUyIDAtMTgwIDgwLjc0OC0xODAgMTgwIDAgNTguODc4IDI4Ljk3NCAxMzAuODEzIDg2LjExNiAyMTMuODA2IDQyLjA1OSA2MS4wODUgODMuNDYyIDEwNC42NTUgODUuMiAxMDYuNDhhMTIgMTIgMCAwIDAgMTcuMzYgMGMxLjc0Mi0xLjgyNSA0My4xNDUtNDUuMzk1IDg1LjItMTA2LjQ4IDU3LjE0Ni04Mi45ODggODYuMTI0LTE1NC45MjggODYuMTI0LTIxMy44MDYgMC05OS4yNTItODAuNzQ4LTE4MC0xODAtMTgwem0tLjQ3OCAzMTEuMjE4Yy03Mi43ODUgMC0xMzItNTkuMjE1LTEzMi0xMzJzNTkuMjE1LTEzMiAxMzItMTMyIDEzMiA1OS4yMTUgMTMyIDEzMi01OS4yMTUgMTMyLTEzMiAxMzJ6Ii8+PHBhdGggZD0ibTIwNyAxNjRoMTZhMTIgMTIgMCAwIDAgMC0yNGgtMTZhNDQuMDQ5IDQ0LjA0OSAwIDAgMCAtNDQgNDR2MTZhNDQuMDQ5IDQ0LjA0OSAwIDAgMCA0NCA0NGgxNmExMiAxMiAwIDAgMCAwLTI0aC0xNmEyMC4wMjMgMjAuMDIzIDAgMCAxIC0yMC0yMHYtMTZhMjAuMDIzIDIwLjAyMyAwIDAgMSAyMC0yMHoiLz48Y2lyY2xlIGN4PSIxNDMiIGN5PSIxNDQiIHI9IjEyIi8+PHBhdGggZD0ibTUwMi44IDk5LjAyNGExMiAxMiAwIDAgMCAtMTEuNzU1LTEuMjg5IDI4IDI4IDAgMCAxIC0zMy43MTYtNDIuMTU2IDEyIDEyIDAgMCAwIC04LjA5NC0xOC45NCA2OC44MTEgNjguODExIDAgMCAwIC05LjIzNS0uNjM5IDY4IDY4IDAgMSAwIDY3Ljc0MiA3My43NjcgMTIgMTIgMCAwIDAgLTQuOTQyLTEwLjc0M3oiLz48Y2lyY2xlIGN4PSI0MzIiIGN5PSI0MDgiIHI9IjY4Ii8+PHBhdGggZD0ibTQ0NCAzMTJ2LThhMTIgMTIgMCAwIDAgLTI0IDB2OGExMiAxMiAwIDAgMCAyNCAweiIvPjxwYXRoIGQ9Im00NzkuOTg5IDMzNi44NjNhMTIgMTIgMCAwIDAgMTAuNC02bDQtNi45MjdhMTIgMTIgMCAxIDAgLTIwLjc4NC0xMmwtNCA2LjkyN2ExMiAxMiAwIDAgMCAxMC4zODEgMTh6Ii8+PHBhdGggZD0ibTM3My42MDggMzMwLjg2MWExMiAxMiAwIDEgMCAyMC43ODQtMTJsLTQtNi45MjdhMTIgMTIgMCAxIDAgLTIwLjc4NCAxMnoiLz48cGF0aCBkPSJtMzU0Ljg2MiAzNDkuNjA3LTYuOTI4LTRhMTIgMTIgMCAwIDAgLTEyIDIwLjc4Nmw2LjkyOCA0YTEyIDEyIDAgMCAwIDEyLTIwLjc4NnoiLz48cGF0aCBkPSJtMzQ4IDQwOGExMiAxMiAwIDAgMCAtMTItMTJoLThhMTIgMTIgMCAwIDAgMCAyNGg4YTEyIDEyIDAgMCAwIDEyLTEyeiIvPjxwYXRoIGQ9Im0zNDIuODYxIDQ0NS42MDctNi45MjggNGExMiAxMiAwIDEgMCAxMiAyMC43ODZsNi45MjgtNGExMiAxMiAwIDAgMCAtMTItMjAuNzg2eiIvPjxwYXRoIGQ9Im0zOTAgNDgwLjc0NmExMiAxMiAwIDAgMCAtMTYuMzkyIDQuMzkzbC00IDYuOTI3YTEyIDEyIDAgMSAwIDIwLjc4NCAxMmw0LTYuOTI3YTEyIDEyIDAgMCAwIC00LjM5Mi0xNi4zOTN6Ii8+PC9nPjwvZz48L3N2Zz4=" />
          <h3 class="info-caption">Feels Like</h3>
        </div>
        <h3 class="info-data">${Math.round(current.feels_like)}°</h3>
      </div>
      <div class="horizontal-line"></div>
      <div class="wind w-info">
        <div class="caption-container">
        <img class="w-info-thumb" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGcgaWQ9Il8yOC13aW5kX2RpcmVjdGlvbiIgZGF0YS1uYW1lPSIyOC13aW5kIGRpcmVjdGlvbiI+PGcgaWQ9ImdseXBoIj48cGF0aCBkPSJNNDY4LDQ2MGExMiwxMiwwLDAsMCwwLTI0SDI2OFY0MTEuNjc0QTIyMCwyMjAsMCwwLDAsNDc2LDE5MmExMiwxMiwwLDAsMC0xMi0xMkgxODhWMTI4YTc2LDc2LDAsMCwwLTE1MiwwdjIwSDE2YTEyLDEyLDAsMCwwLDAsMjRIMzZ2MTguMjE4QTIxOS40MywyMTkuNDMsMCwwLDAsNTMuNjQ4LDI3Ni42NmEyMjMuNDMzLDIyMy40MzMsMCwwLDAsNDcuOTY0LDcwLjg4MWMzOC43NjIsMzguNjkyLDg4LjkyNyw2MS4xODIsMTQyLjM4OCw2NC4xMThWNDM2SDU1LjYzM2wxNS4wMjMtMTAuMDE2YTEyLDEyLDAsMSwwLTEzLjMxMi0xOS45NjhsLTQ4LDMyYTEyLDEyLDAsMCwwLDAsMTkuOTY4bDQ4LDMyYTEyLDEyLDAsMSwwLDEzLjMxMi0xOS45NjhMNTUuNjMzLDQ2MEgyNDR2MzZhMTIsMTIsMCwwLDAsMjQsMFY0NjBaTTEwNCwxMzJhMTIsMTIsMCwxLDEsMTItMTJBMTIsMTIsMCwwLDEsMTA0LDEzMlptODQsMjAwLjY3OFYyNDhhMTIsMTIsMCwwLDEsMTItMTJIMzkxLjQ1NGExMi40MzEsMTIuNDMxLDAsMCwxLDguMjU2LDIuOTc1QTEyLjAxMSwxMi4wMTEsMCwwLDEsNDAzLjExLDI1MmExNTYuMDg1LDE1Ni4wODUsMCwwLDEtMjA3LjgzOCw5MS43MTVBMTEuOTc0LDExLjk3NCwwLDAsMSwxODgsMzMyLjY3OFoiLz48cGF0aCBkPSJNNDgzLjQxNyw0NzZIMzg0LjU4M2wxMi42ODQsMjUuMzY2QTEyLDEyLDAsMCwwLDQwOCw1MDhoNzJhMTIsMTIsMCwwLDAsMTAuNzMzLTE3LjM2NloiLz48cGF0aCBkPSJNMzk3LjI2NywzOTQuNjM0LDM4NC41ODMsNDIwaDk4LjgzNGw3LjMxNi0xNC42MzRBMTIsMTIsMCwwLDAsNDgwLDM4OEg0MDhBMTIsMTIsMCwwLDAsMzk3LjI2NywzOTQuNjM0WiIvPjxwYXRoIGQ9Ik00MS4yMTIsNjkuM2E5MS44ODIsOTEuODgyLDAsMCwxLDE0MS41NzYsMGwxMC45NDEtMTAuNGExMiwxMiwwLDAsMCwuOTE2LTE2LjQzLDEwNy45OTIsMTA3Ljk5MiwwLDAsMC0xNjUuMjksMCwxMiwxMiwwLDAsMCwuOTE2LDE2LjQzWiIvPjxwYXRoIGQ9Ik00NjQsODRhMjcuODM4LDI3LjgzOCwwLDAsMSwxMiwyLjcwN1Y2NGExMiwxMiwwLDAsMC0xMi0xMmgtOGMtNjUuOTg4LDAtMTIwLjgyLDQ4LjY3MS0xMzAuNDg3LDExMmgzNC4xNzVBMTA4LjE4OCwxMDguMTg4LDAsMCwxLDQ2NCw4NFoiLz48cGF0aCBkPSJNNDY0LDEwMGE5Mi4xNjEsOTIuMTYxLDAsMCwwLTg3LjYzOCw2NEg0NjRhMjcuODM4LDI3LjgzOCwwLDAsMSwxMiwyLjcwN1YxMTJBMTIsMTIsMCwwLDAsNDY0LDEwMFoiLz48L2c+PC9nPjwvc3ZnPgo=" />
          <h3 class="info-caption">Wind</h3>
        </div>
        <h3 class="info-data">${Math.round(current.wind_speed)} km/h</h3>
      </div>
      <div class="horizontal-line"></div>
      <div class="pressure w-info">
        <div class="caption-container">
          <img class="w-info-thumb" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9Il8xOS10aWRlX2Rvd24iIGRhdGEtbmFtZT0iMTktdGlkZSBkb3duIj48ZyBpZD0iZ2x5cGgiPjxwYXRoIGQ9Im00ODAgMTgwYTEyIDEyIDAgMCAwIC0xMiAxMiA0NCA0NCAwIDAgMSAtODggMCAxMiAxMiAwIDAgMCAtMjQgMCA0NCA0NCAwIDAgMSAtODggMCAxMiAxMiAwIDAgMCAtMjQgMCA0NCA0NCAwIDAgMSAtODggMCAxMiAxMiAwIDAgMCAtMjQgMCA0NCA0NCAwIDAgMSAtODggMCAxMiAxMiAwIDAgMCAtMjQgMHYyNDhhNjcuOTgzIDY3Ljk4MyAwIDAgMCAxMjQgMzguNTM2IDY3Ljk0OSA2Ny45NDkgMCAwIDAgMTEyIDAgNjcuOTQ5IDY3Ljk0OSAwIDAgMCAxMTIgMCA2Ny45ODMgNjcuOTgzIDAgMCAwIDEyNC0zOC41MzZ2LTI0OGExMiAxMiAwIDAgMCAtMTItMTJ6bS0zNDMuNTE1IDE3Mi4wOTQtNDAgNDBhMTIgMTIgMCAwIDEgLTE2Ljk3IDBsLTQwLTQwYTEyIDEyIDAgMCAxIDE2Ljk3LTE2Ljk3MWwxOS41MTUgMTkuNTE1di01MS4wM2ExMiAxMiAwIDAgMSAyNCAwdjUxLjAzbDE5LjUxNS0xOS41MTVhMTIgMTIgMCAwIDEgMTYuOTcgMTYuOTcxem0xNjcuNyAyNC4zOTEtNDAgNDBhMTIgMTIgMCAwIDEgLTE2Ljk3MSAwbC00MC00MGExMiAxMiAwIDAgMSAxNi45NzEtMTYuOTdsMTkuNTE1IDE5LjUxNHYtNTEuMDI5YTEyIDEyIDAgMCAxIDI0IDB2NTEuMDI5bDE5LjUxNC0xOS41MTRhMTIgMTIgMCAwIDEgMTYuOTcxIDE2Ljk3em0xNjguMy0yNC4zOTEtNDAgNDBhMTIgMTIgMCAwIDEgLTE2Ljk3IDBsLTQwLTQwYTEyIDEyIDAgMSAxIDE2Ljk3LTE2Ljk3MWwxOS41MTUgMTkuNTE1di01MS4wM2ExMiAxMiAwIDEgMSAyNCAwdjUxLjAzbDE5LjUxNS0xOS41MTVhMTIgMTIgMCAwIDEgMTYuOTcgMTYuOTcxeiIvPjxwYXRoIGQ9Im0yNTUuODY1IDEzOS40MTNhNjcuOTk0IDY3Ljk5NCAwIDAgMCA2Ny43NDItNjIuMjMzIDEyIDEyIDAgMCAwIC0xNi43LTEyLjAzMSAyOCAyOCAwIDAgMSAtMzMuNzE1LTQyLjE1NyAxMiAxMiAwIDAgMCAtOC4wOTItMTguOTQgNjguODIzIDY4LjgyMyAwIDAgMCAtOS4yMzUtLjYzOSA2OCA2OCAwIDEgMCAwIDEzNnoiLz48L2c+PC9nPjwvc3ZnPg==" />
          <h3 class="info-caption">Pressure</h3>
        </div>
        <h3 class="info-data">${current.pressure} hPa</h3>
      </div>
    </div>`;

  document
    .querySelector("#weather-info")
    .insertAdjacentHTML("beforeend", moreInfo);
}

export { displayCurrentWeather, displayWeeklyWeather, displayMoreInfo };
