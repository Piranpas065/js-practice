const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const statusText = document.getElementById('status');
const weatherCard = document.getElementById('weather-card');
const cityNameText = document.getElementById('city-name');
const temperatureText = document.getElementById('temperature');
const windText = document.getElementById('wind');
const forecastList = document.getElementById('forecast-list');

async function getCity(cityName) {

const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;

  const response = await fetch(url);

  if(!response.ok) {
    throw new Error("Could not search city");
  }

  const data = await response.json();

  if(!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return data.results[0];
}

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;

  const response = await fetch(url);

  if(!response.ok) {
    throw new Error("Could not load weather");
  }

  const data = await response.json();

  return { current: data.current, daily: data.daily };
}

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const cityName = cityInput.value.trim();

  if (cityName === "") {
    statusText.textContent = "Please enter a city";
    return;
  }

  statusText.textContent = "Loading...";
  weatherCard.hidden = true;
  forecastList.hidden = true;
  searchButton.disabled = true;

  try {
    const city = await getCity(cityName);
    const weather = await getWeather(city.latitude, city.longitude);
    cityNameText.textContent = `${city.name}, ${city.country}`;
    temperatureText.textContent = weather.current.temperature_2m;
    windText.textContent = weather.current.wind_speed_10m;
    renderForecast(weather.daily);

    statusText.textContent = "";
    weatherCard.hidden = false;
    forecastList.hidden = false;
  } catch (error) {
    statusText.textContent = error.message;
  } finally {
    searchButton.disabled = false;
  }
});

function renderForecast(daily) {
  forecastList.innerHTML = "";

  daily.time.forEach(function (date, index) {
    const li = document.createElement("li");

    const max = daily.temperature_2m_max[index];
    const min = daily.temperature_2m_min[index];

    li.textContent = `${date} - ${min} to ${max} °C`;

    forecastList.appendChild(li);
  });
}