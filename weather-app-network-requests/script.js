const apiKey = "8de30740803d4f6331ad8f43136c1127";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weather-result");
const locationText = document.getElementById("location");
const temperatureText = document.getElementById("temperature");
const descriptionText = document.getElementById("description");
const conditionText = document.getElementById("condition");
const weatherDetails = document.getElementById("weather-details");
const submitButton = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  await fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  setLoading(true);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch weather data.");
    }

    displayWeather(data);
    showSuccess(`Weather loaded successfully for ${data.name}.`);
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

function displayWeather(data) {
  locationText.textContent = `${data.name}, ${data.sys.country}`;
  temperatureText.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionText.textContent = data.weather[0].description;
  conditionText.textContent = `Condition: ${data.weather[0].main}`;
  weatherDetails.innerHTML = "";

  addDetail("Feels like", `${Math.round(data.main.feels_like)}°C`);
  addDetail("Humidity", `${data.main.humidity}%`);
  addDetail("Wind speed", `${data.wind.speed} m/s`);
  addDetail("Cloud cover", `${data.clouds.all}%`);
  addDetail("Pressure", `${data.main.pressure} hPa`);
  addDetail("Visibility", `${(data.visibility / 1000).toFixed(1)} km`);

  weatherResult.classList.remove("hidden");
}

function addDetail(label, value) {
  const detail = document.createElement("div");
  detail.className = "detail";
  detail.innerHTML = `<dt>${label}</dt><dd>${value}</dd>`;
  weatherDetails.appendChild(detail);
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Loading..." : "Search";
}

function showSuccess(text) {
  message.textContent = text;
  message.classList.remove("error");
}

function showError(text) {
  message.textContent = text;
  message.classList.add("error");
  weatherResult.classList.add("hidden");
}
