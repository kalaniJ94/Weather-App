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
var queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
//Geolocation API. Will return "lat" & "lon" to paste into queryAPI var. 
var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q={city name},&limit={limit}&appid={API key}"
// var apiKey = "76a28d16d99532ab44512adf8fe3abab";

var city = "";
var lon = "";
var lan = "";

console.log("hello");
// function callData(){
// fetch(queryURL)
// .then(response => {
//     if (response.ok) {
//         return response.json();
//     } else {
//         throw new Error('Network response is not okay', error);
//     }
// })
// .then(data=> {
//     console.log(data);
// })
// .catch(error=> {
//     console.error('There was an error with the fetch operation')
// })
// console.log(queryURL);
// }
// Search Section

// We'll have a event listener for the search button here, which will grab the text entered into the form, which will also have a id to assign value. The text must be entered into local storage, to use with the search history function. The search should be stored as a variable "eg: city" There will also be  a variable for the api query ("eg: queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;"). THen, we'll make a api call using fetch ("eg: fetch(queryURL)")
function saveSearch(){
    var saveButton = document.querySelector("Btn");
    saveButton.addEventListener("click", function (){
        var searchInput = this.previousElementSibling.value;
        localStorage.setItem(searchInput);
        console.log(searchInput);
    })
}

// Search History
// We will grab the entered local storage object here from past entries, and display them as working links. The links must fill the todayForecast function and futureForecast functions, just as if they had been entered again. 

function displayHistory(){
    var savedText = localStorage.getItem(searchInput);
    if(savedText){
        displayText = document.getElementById(searchHistory).querySelector("textarea");
        displayText.value = savedText;
    }
};
// Current Forecast
// currentForecast function will grab information from the API and display the date, an icon for the projected weather, as well as temp, wind, and humidity.
 

//Future Forecast
// futureForecast will display the next five days (NOT including currentday) of forecasts, as well as the same info from currentForecast(date, icon, temp, wind and humidity.)

//    callData(); 
   saveSearch();
