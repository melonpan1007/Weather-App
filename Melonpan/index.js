// Selecting necessary DOM elements
const weatherForm = document.querySelector(".weatherForm"); // Selecting form element
const cityInput = document.querySelector(".cityInput"); // Selecting input field for city
const weatherInfo = document.querySelector(".weatherInfo"); // Selecting weather info display area

// API key for OpenWeatherMap
const apiKey = "21728f127bf315a60915ed60ae031d7a";

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevent default form submission behavior

    const city = cityInput.value.trim(); // Get the value of the city input field
    if (city) {
        try {
            // Call function to fetch weather data for the entered city
            const weatherData = await getWeatherData(city);
            // Display weather information on the card
            displayWeatherInfo(weatherData);
        } catch (error) {
            // If an error occurs during fetching weather data, display the error
            console.error(error);
            displayError(error.message);
        }
    } else {
        // If no city is entered, display an error message
        displayError("Please enter a city");
    }
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl); // Fetch weather data from the API
    console.log(response); // Log the response object to the console

    // If the response is not ok, throw an error
    if (!response.ok) {
        throw new Error("Could not fetch the weather data");
    }

    // Return the weather data in JSON format
    return await response.json();
}

// Function to display weather information on the card
function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    // Clear existing weather information
    weatherInfo.innerHTML = "";

    // Create HTML elements to display weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("h1");

    // Set text content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Add CSS classes to each element
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append each element to the weather info display area
    weatherInfo.appendChild(cityDisplay);
    weatherInfo.appendChild(tempDisplay);
    weatherInfo.appendChild(humidityDisplay);
    weatherInfo.appendChild(descDisplay);
    weatherInfo.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere
        case (weatherId === 800):
            return "☀️"; // Clear
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"; // Clouds
        default:
            return "❓"; // Unknown
    }
}

// Function to display error message on the card
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // Clear existing weather information
    weatherInfo.innerHTML = "";

    // Append error message to the weather info display area
    weatherInfo.appendChild(errorDisplay);
}
