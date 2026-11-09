const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const statusText = document.getElementById('status');
const weatherCard = document.getElementById('weather-card');
const cityNameText = document.getElementById('city-name');
const temperatureText = document.getElementById('temperature');
const windText = document.getElementById('wind');

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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

  const response = await fetch(url);

  if(!response.ok) {
    throw new Error("Could not load weather");
  }

  const data = await response.json();

  return data.current;
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
  searchButton.disabled = true;

  try {
    const city = await getCity(cityName);
    const weather = await getWeather(city.latitude, city.longitude);
    cityNameText.textContent = `${city.name}, ${city.country}`;
    temperatureText.textContent = `${weather.temperature_2m} °C`;
    windText.textContent = `${weather.wind_speed_10m} m/s`;

    statusText.textContent = "";
    weatherCard.hidden = false;
  } catch (error) {
    statusText.textContent = error.message;
  } finally {
    searchButton.disabled = false;
  }
});