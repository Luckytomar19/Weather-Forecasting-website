// Get references to HTML elements
const searchBtn = document.getElementById('searchBtn');
const inputBox = document.querySelector('.input-box');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherImg = document.querySelector('.weather-img');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a valid city!');
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function checkWeather(city) {
    const apiKey = "3a0edd36cabe5d98f25b415137aa3018"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const weatherData = await response.json();

        // Update weather information on the page
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}<sup>°C</sup>`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.textContent = `${weatherData.main.humidity}%`;
        windSpeed.textContent = `${weatherData.wind.speed} Km/H`;

        // Update weather image based on weather condition
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case 'clouds':
                weatherImg.src = 'cloud.png';
                break;
            case 'clear':
                weatherImg.src = 'clear.png';
                break;
            case 'rain':
                weatherImg.src = 'rain.png';
                break;
            case 'mist':
                weatherImg.src = 'mist.png';
                break;
            case 'snow':
                weatherImg.src = 'snow.png';
                break;
            
                      
            default:
                weatherImg.src = 'default.png';
                break;
        }
    } catch (error) {
        console.error('There was a problem fetching the weather data:', error);
        // Handle the error, show a message, or update UI accordingly
    }
}
