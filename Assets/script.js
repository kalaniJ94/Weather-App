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
//This is the forecaster api
//Geolocation API. Will return "lat" & "lon" to paste into queryAPI var. 
var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q={" + city + "},&limit={limit}&appid={" + apiKey + "}"
var lon = "";
var lan = "";

var apiKey = "76a28d16d99532ab44512adf8fe3abab";

var city = "";


function GeoLocal() {
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q={" + city + "}&limit={1}&appid={" + apikey + "}"
        ;
    fetch(geoUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Geo return error', error);
            }
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(error => {
            console.error('There was an error with the geo fetch operation', error);
        });
    console.log(geoUrl);
}

// function callData(){
//     var queryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid={" + apiKey +  "}";
// fetch(queryURL)
// .then(response => {
//     if (response.ok) {
//         return response.json();
//     } else {
//         throw new Error('Network response is not okay', error);
//     }
// })
// .then(function (data) {
//     console.log(data);
// })
// .catch(error=> {
//     console.error('There was an error with the weather fetch operation', error);
// });
// console.log(queryURL);
// }
// Search Section

// We'll have a event listener for the search button here, which will grab the text entered into the form, which will also have a id to assign value. The text must be entered into local storage, to use with the search history function. The search should be stored as a variable "eg: city" There will also be  a variable for the api query ("eg: queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;"). THen, we'll make a api call using fetch ("eg: fetch(queryURL)")
function saveSearch() {
    document.addEventListener("DOMContentLoaded", function () {
        var saveButton = document.querySelector("#searchBtn");
        console.log("saveButton", saveButton);
        if(saveButton){
        saveButton.addEventListener("click", function () {
            var searchInput = document.querySelector("#searchInput").value;
            var savedText = JSON.parse(localStorage.getItem("searchInput")) || [];

            savedText.push(searchInput);
            localStorage.setItem("searchInput", JSON.stringify(savedText));
            console.log(searchInput);

            displayHistory();
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
    var savedText = JSON.parse(localStorage.getItem("searchInput")) || [];
    // if (savedText) {
    var displaySpace = document.getElementById("display");
    //     console.log(displayText.textContent,)
    displaySpace.innerHTML = "";

    if (savedText.length> 0) {
        var ul = document.createElement("ul");
        console.log("yes");
        display.textContent = savedText;
        // for (var i = 0; i < savedText.length; i++) {
        //     var historyItems = document.createElement("li");
        //     historyItems.textContent = savedText[i];
        //     displaySpace.appendChild(historyItems);
        // }
    }
     else {
        console.error("No search history available");
    }


};


// Current Forecast
// currentForecast function will grab information from the API and display the date, an icon for the projected weather, as well as temp, wind, and humidity.


//Future Forecast
// futureForecast will display the next five days (NOT including currentday) of forecasts, as well as the same info from currentForecast(date, icon, temp, wind and humidity.)

//    callData(); 
saveSearch();
