import weatherData from "./weatherData";

function getCoordinates(query) {
  return fetch(
    `https://eu1.locationiq.com/v1/search.php?key=pk.c012d937862c346c501e3aeeab1f13b9&q=${query}&format=json`
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      return data[0];
    });
}

function getWeather(city) {
  weatherData.lastSearch = city.display_name;
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=${weatherData.currentUnit}&appid=577762e27d7c949b728446a34f17376d`
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (weather) {
      return weather;
    });
}

export { getCoordinates, getWeather };
