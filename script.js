const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
});

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    errorMsg.classList.add('error-hidden');
    
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        const current = data.current_condition[0];
        const area = data.nearest_area[0];

        cityName.textContent = `${area.areaName[0].value}, ${area.country[0].value}`;
        temp.textContent = `${current.temp_C} °C`;
        condition.textContent = current.weatherDesc[0].value;
        humidity.textContent = current.humidity;
        wind.textContent = current.windspeedKmph;

        weatherInfo.classList.remove('weather-hidden');
    } catch (err) {
        weatherInfo.classList.add('weather-hidden');
        errorMsg.classList.remove('error-hidden');
    }
}
