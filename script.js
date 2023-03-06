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

    // Weather information on given city
    console.log(weather);

    // Date items
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let time = date.toLocaleTimeString();
    let currentDate = `${day}-${month}-${year}`;

    // City name change
    document.getElementsByClassName('city')[0].innerHTML = 
    weather.name + ', ' + weather.sys.country;

    // Time change

    if (document.querySelector('#date').classList.contains('active')) {
        document.getElementsByClassName('date')[0].innerHTML = currentDate;
    }
    else {
        document.getElementsByClassName('date')[0].innerHTML = time;
    }
    



    // Temperature Change
    if (document.querySelector('#celsius').classList.contains('active')) {
        document.getElementsByClassName('temp')[0].innerHTML = 
        Math.floor(weather.main.feels_like) + "°C";
    }
    else {
        document.getElementsByClassName('temp')[0].innerHTML = 
        Math.floor((weather.main.feels_like - 32) * 0.55) + "°F";
    }
    
    // Weather Status change
    document.getElementsByClassName('status')[0].innerHTML = 
    weather.weather[0].description;
}


// Settings functions

function displayChange(selectedButton) {
    
    document.querySelector('#dark').classList.remove('active');
    document.querySelector('#light').classList.remove('active');

    selectedButton.classList.add('active');

    if (selectedButton.id == 'dark') {
        const elementsList = document.querySelectorAll('.light-mode');

        elementsList.forEach((element) => {
            element.classList.remove('light-mode');
            element.classList.add('dark-mode');
        })
    }
    else {
        const elementsList = document.querySelectorAll('.dark-mode');

        elementsList.forEach((element) => {
            element.classList.remove('dark-mode')
            element.classList.add('light-mode')
        })
    }
}

function tempChange(selectedButton) {
    document.querySelector('#celsius').classList.remove('active');
    document.querySelector('#fahrenheit').classList.remove('active');

    selectedButton.classList.add('active');

    // Change given temperature measurement

    getResults(searchbox.value);

    // Keeping the bottom solution just in case I would like to review some things


    // const currentTemp = document.getElementsByClassName('temp')[0];

    // if (selectedButton.id == 'celsius') {
    //     currentTemp.innerHTML = Math.ceil((currentTemp.innerText.slice(0, -2) - 32) * 0.55) + "°C";
    // }
    // else {
    //     currentTemp.innerHTML = Math.floor((currentTemp.innerText.slice(0, -2) * 1.8) + 32) + "°F";
    // }
    
}

function timeChange(selectedButton) {

    // Change current active button
    document.querySelector('#date').classList.remove('active');
    document.querySelector('#time').classList.remove('active');

    selectedButton.classList.add('active');

    // Change given time perspective
    getResults(searchbox.value);
}