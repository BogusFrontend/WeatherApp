const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const errorElement = document.querySelector('.error');
const weatherElement = document.querySelector('.weather');

const API_KEY = '260bb7015c89e8bbfe726bcb038aba74';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${API_KEY}`);

    if (response.status === 404) {
        errorElement.style.display = 'block';
        weatherElement.style.display = 'none';
    } else {
        const data = await response.json();

        cityElement.textContent = data.name;
        tempElement.textContent = `${((data.main.temp) * 5 / 9).toFixed()}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed.toFixed()}hm/h`;

        const weatherMappings = {
            'Clouds': 'images/clouds.png',
            'Clear': 'images/clear.png',
            'Rain': 'images/rain.png',
            'Mist': 'images/mist.png',
            'Drizzle': 'images/drizzle.png',
            'Snow': 'images/snow.png',
        };

        const weatherType = data.weather[0].main;
        weatherIcon.src = weatherMappings[weatherType];
        weatherElement.style.display = 'block';
        errorElement.style.display = 'none';
    }
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchInput.value);
    }
});

searchButton.addEventListener('click', () => {
    checkWeather(searchInput.value);
});
