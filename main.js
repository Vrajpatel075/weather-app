document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector('.weather-app'); // 🔧 Wrapped in DOMContentLoaded
  const temp = document.querySelector('.temp');
  const dateOutput = document.querySelector('.date');
  const timeOutput = document.querySelector('.time');
  const conditionOutput = document.querySelector('.condition');
  const nameOutput = document.querySelector('.name');
  const icon = document.querySelector('.icon');
  const cloudOutput = document.querySelector('.Cloud');
  const humidityOutput = document.querySelector('.Humidity');
  const WindOutput = document.querySelector('.Wind');
  const form = document.getElementById('locationInput');
  const search = document.querySelector('.search');
  const btn = document.querySelector('.submit');
  const cities = document.querySelectorAll('.city');

  let cityInput = "Mumbai";

  cities.forEach((city) => {
    city.addEventListener('click', (e) => {
      cityInput = e.target.innerHTML;
      fetchWeatherData();
      app.style.opacity = "0";
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length === 0) {
      alert('Please type in a city name');
    } else {
      cityInput = search.value;
      fetchWeatherData();
      search.value = "";
      app.style.opacity = "0";
    }
  });

  function dayOfTheWeek(day, month, year) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[new Date(`${year}-${month}-${day}`).getDay()];
  }

  fetchWeatherData();

  function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=1155f6d36225489c9cb194428251308&q=${cityInput}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        // 🌡️ Temperature and condition
        temp.innerHTML = `${data.current.temp_c}°`;
        conditionOutput.innerHTML = data.current.condition.text;
        nameOutput.innerHTML = data.location.name;

        // 📅 Date and time
        const localTime = data.location.localtime;
        const y = parseInt(localTime.substr(0, 4));
        const m = parseInt(localTime.substr(5, 2));
        const d = parseInt(localTime.substr(8, 2));
        const time = localTime.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;

        // 🌥️ Weather details
        cloudOutput.innerHTML = `${data.current.cloud}%`;
        humidityOutput.innerHTML = `${data.current.humidity}%`;
        WindOutput.innerHTML = `${data.current.wind_kph} km/h`;

        // 🌈 Weather icon
        icon.src = "https:" + data.current.condition.icon;

        // 🌄 Background logic
        let timeOfDay = data.current.is_day ? "day" : "night";
        const code = data.current.condition.code;

        let bg = "./Images/" + timeOfDay + "/clear.jpg"; // 🔧 Default background

        if (code === 1000) {
          bg = `./Images/${timeOfDay}/clear.jpg`;
        } else if (
          code === 1003 || code === 1006 || code === 1009 ||
          code === 1030 || code === 1069 || code === 1087 ||
          code === 1135 || code === 1273 || code === 1276 ||
          code === 1279 || code === 1282
        ) {
          bg = `./Images/${timeOfDay}/cloudy.jpg`;
        } else if (
          code === 1063 || code === 1069 || code === 1072 ||
          code === 1150 || code === 1153 || code === 1180 ||
          code === 1183 || code === 1186 || code === 1189 ||
          code === 1192 || code === 1195 || code === 1201 ||
          code === 1240 || code === 1243 || code === 1246 ||
          code === 1249 || code === 1252
        ) {
          bg = `./Images/${timeOfDay}/rainy.jpg`;
        } else {
          bg = `./Images/${timeOfDay}/snowy.jpg`;
        }

        app.style.backgroundImage = `url(${bg})`; // 🔧 Dynamic background
        btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";

        app.style.opacity = "1";
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }
});
