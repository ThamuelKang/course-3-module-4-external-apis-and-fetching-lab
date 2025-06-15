const API_KEY = "a6bebe3731fbe1c4727469c0677d50e5"

const temperatureText = document.getElementById("temperature")
const descriptionText = document.getElementById("description")
const humidityText = document.getElementById("humidity")
const searchBar = document.getElementById("city-input")
const submitButton = document.getElementById("fetch-weather")
const errorContainer = document.getElementById("error-message");

async function fetchWeatherData(city) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            if (response.status === 404) {
                displayError("City not found. Please try again");
            } else {
                displayError(`Error ${response.status}: ${response.statusText}`);
            }
            return;
        }

        const data = await response.json();
        displayWeather(data);
        displayError("")

    } catch (error) {
        displayError("Something went wrong");
        console.log(error);
    }
}

function displayWeather(data) {
    temperatureText.textContent = data.main.temp
    descriptionText.textContent = data.weather[0].description
    humidityText.textContent = data.main.humidity
}

fetchWeatherData("San Francisco")

submitButton.addEventListener("click", () => {
    fetchWeatherData(searchBar.value)
})

function displayError(message) {
    if (message) {
        errorContainer.textContent = message;
        errorContainer.style.display = "block";
    } else {
        errorContainer.textContent = "";
        errorContainer.style.display = "none";
    }
}