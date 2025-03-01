// ========== START DOM ELEMENTS ==========
const weatherForm = document.querySelector("form");
const userInput = document.querySelector("#user-input");
const weatherInfo = document.querySelector(".weather-info");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weather-description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const weatherIcon = document.querySelector("#weather-icon");
// ========== END DOM ELEMENTS ==========

// ========== START FORM SUBMIT EVENT ==========
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});
// ========== END FORM SUBMIT EVENT ==========

// ========== START GET WEATHER DATA ==========
const getWeatherData = async () => {
  const inputValue = userInput.value.trim();

  if (inputValue === "") {
    alert("Please Enter City Name");
    return;
  }

  const apiKey = "f6cd243927284defe80bcb831d829f31";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(`${error.message}`);
  }
};
// ========== END GET WEATHER DATA ==========

// ========== START DISPLAY WEATHER ==========
const displayWeather = (data) => {
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  weatherIcon.src = iconUrl;

  weatherInfo.style.display = "block"; // Show weather info
};
// ========== END DISPLAY WEATHER ==========
