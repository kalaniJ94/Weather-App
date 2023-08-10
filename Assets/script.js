// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed 
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city.


//  API link:  `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.
// Will need to create  avariable for the APIKey

// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// ---------------------------------------------------------------
// Search Section

// We'll have a event listener for the search button here, which will grab the text entered into the form, which will also have a id to assign value. The text must be entered into local storage, to use with the search history function. The search should be stored as a variable "eg: city" There will also be  a variable for the api query ("eg: queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;"). THen, we'll make a api call using fetch ("eg: fetch(queryURL)")
var apiKey = "76a28d16d99532ab44512adf8fe3abab";
// var city = ""


function saveSearch() {
    document.addEventListener("DOMContentLoaded", function () {
        var saveButton = document.querySelector("#searchBtn");
        if (saveButton) {
            saveButton.addEventListener("click", function () {
                var searchInput = document.querySelector("#searchInput").value;
                var savedText = JSON.parse(localStorage.getItem("City")) || [];

                savedText.push(searchInput);
                localStorage.setItem("City", JSON.stringify(savedText));

                displayHistory();
                getLocal(searchInput);
                getData()
            });
        } else {
            console.error("save button not found");
        }
        displayHistory();
        


    });
};

// Search History
// We will grab the entered local storage object here from past entries, and display them as working links. The links must fill the todayForecast function and futureForecast functions, just as if they had been entered again. 

function displayHistory() {
    var savedText = JSON.parse(localStorage.getItem("City")) || [];
    if (savedText) {
        var displaySpace = document.getElementById("display");

        displaySpace.innerHTML = "";
    }
    if (savedText.length > 0) {
        var ul = document.createElement("ul");

        for (var i = 0; i < savedText.length; i++) {
            var historyItems = document.createElement("li" );
            historyItems.textContent = savedText[i];
            displaySpace.appendChild(historyItems);
        }
    }
    else {
        console.error("No search history available");
    }

};



function getLocal(city) {
    // var city = JSON.parse(localStorage.getItem("City")) || "";
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    console.log(city);
    fetch(geoUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Geo return error');

            }
        })
        .then(function (data) {
            console.log(data);
            var lon = data[0].lon;
            var lat = data[0].lat;
            var cityName = data[0].name;
            console.log(cityName);
            getData(lat, lon, cityName);
        })
        .catch(error => {
            console.error('There was an error with the geo fetch operation', error);
        });
    console.log(geoUrl);
};
function getData(lat, lon) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    console.log("weatherAPI:", weatherAPI);

    fetch(weatherAPI)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error weather API');
            }
        })
        // need icon, temp, humidity and wind speed
        .then(function (data) {
            console.log(data.list[0]);
            var icon = data.list[0].weather[0].icon;
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var wind = data.list[0].wind.speed;
            var cityName = data.city.name;
            var date = data.list[0].dt_txt;
            console.log("Icon is " + icon + ". The temperature in " + cityName + " is " + temp + "The humidity is " + humidity + "wind speed is " + wind + " MPH and the date is " + date);
            currentDay(temp, wind, humidity, icon, date, cityName);
            futureFunction(data);
        })
        .catch(error => {
            console.error(error)
        });
    };
    // Current Forecast
    // currentForecast function will grab information from the API and display the date, an icon for the projected weather, as well as temp, wind, and humidity.
    function currentDay(temp, wind, humidity, icon, date ,cityName) {
        var currentDisplay = document.querySelector("#currentWeather");
        
        if (currentDisplay) {
            console.log("Connected");
        }
        
        var content = `
        <h3>Today's Weather in ${cityName}</h3>
<img id=icon src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
<div>Temperature: ${temp} °F</div>
<div>Wind: ${wind} MPH</div>
<div>Humidity: ${humidity}%</div>
`
console.log(cityName)
currentDisplay.innerHTML = content;


};

// Future Forecast
// futureForecast will display the next five days (NOT including current day) of forecasts, as well as the same info from currentForecast(date, icon, temp, wind and humidity.)

function futureFunction(data) {
    var futureDisplay = document.querySelector("#forecastCtn");
    
    if (futureDisplay) {
        // Clear previous content.
        futureDisplay.innerHTML = "";
        
        // Loop through the next five days of data
        for (var i = 1; i <= 35; i += 8) {
            var dayData = data.list[i];
            if (dayData) {
                var date = dayData.dt_txt;
                var formattedDate = new Date(date).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                });
                var icon = dayData.weather[0].icon;
                var temp = dayData.main.temp;
                var humidity = dayData.main.humidity;
                var wind = dayData.wind.speed;
                console.log(dayData);
                // Create HTML content for each day
                var dayContent = `
                <div class="forecast">
                <h4>Date: ${formattedDate}</h4>
                <h4> Day ${(i / 8) + 1 - .125}</h4> 
                <p>Temperature: ${temp} °F</p>
                <p>Wind: ${wind} MPH</p>
                <p>Humidity: ${humidity}%</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                </div>
                `;
                //line to display Day has some weird math thing going on, I cant figure out how else to do it
                // Append dayContent to futureDisplay
                futureDisplay.insertAdjacentHTML('beforeend', dayContent);
            }
        }
    }
};

function clearHistory(){
    var clearBtn = document.querySelector("#clear")
    if(clearBtn){
        clearBtn.addEventListener("click", function(){
            localStorage.removeItem("City");
            var displaySpace = document.getElementById("display");
            displaySpace.innerHTML = " ";
            var currentDisplay = document.querySelector("#currentWeather");
            currentDisplay.innerHTML = "";
            var futureDisplay = document.querySelector("#forecastCtn");
            futureDisplay.innerHTML = "";

    });
}
}

var newSearch = document.getElementById("display")
newSearch.addEventListener("click", function(e){
    console.log(e)
   if (e.target.tagName === "LI"){
    getLocal(e.target.textContent);
   }

})


saveSearch();
getLocal();
clearHistory();
