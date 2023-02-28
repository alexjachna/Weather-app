const api = {
    key: '9030230635997cef57b6da00cbe586c3',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();      
        }).then(displayResults);
}

function displayResults(weather) {
    document.getElementsByClassName('city')[0].innerHTML = 
    weather.name + ', ' + weather.sys.country;
    document.getElementsByClassName('temp')[0].innerHTML = 
    Math.floor(weather.main.feels_like) + "°C";
    document.getElementsByClassName('status')[0].innerHTML = 
    weather.weather[0].description;
}