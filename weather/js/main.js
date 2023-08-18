"use strict"
let todayName = document.getElementById("today-name-of-day");
let todayDay = document.getElementById("today-number-of-day");
let todayMonth = document.getElementById("today-number-of-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayImg = document.getElementById("today-img");
let todayText = document.getElementById("today-text");
let todayHumidity = document.getElementById("humidity");
let todayWind = document.getElementById("wind");
let todayWindDirection = document.getElementById("wind-direction");




// Next Days
let nextDay = document.getElementsByClassName("next-name-of-day");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMinTemp = document.getElementsByClassName("next-min-temp");
let nextImg = document.getElementsByClassName("next-img");
let nextText = document.getElementsByClassName("next-text");

// search input 
let searchInput =document.getElementById("search");



// data object 
 

// fetch Api 

async function getAPI(country) { 
     let responAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a07ba8e4053e48f7b30124856231108&q=${country}&days=3`)
 
     let weatherAPI = await responAPI.json();
 
     return weatherAPI ;
    }





// display today data 
function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayDay.innerHTML = todayDate.getDate()

    todayMonth.innerHTML =todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayImg.setAttribute("src",data.current.condition.icon)
    todayText.innerHTML = data.current.condition.text
    todayHumidity.innerHTML = data.current.humidity + "% ";
    todayWind.innerHTML = data.current.wind_kph + " Km/h";
    todayWindDirection.innerHTML = data.current.wind_dir ;

}

// display next days data 
function displayNextData(data) {
    let newData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
    let nextDate = new Date(newData[i+1].date)
      nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
      nextMaxTemp[i].innerHTML = newData[i+1].day.maxtemp_c
      nextMinTemp[i].innerHTML = newData[i+1].day.mintemp_c
    //   nextImg[i].innerHTML = newData[i+1].condition.icon
      nextImg[i].setAttribute("src" , newData[i+1].day.condition.icon ) 

      nextText[i].innerHTML = newData[i+1].day.condition.text
        
    }
   
}

// start APP
async function startApp(country = "cairo") {
    let weatherData =   await  getAPI(country)   
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);       
    }
}

startApp();

searchInput.addEventListener("input",  () => {
    console.log(searchInput.value);
    startApp(searchInput.value)
})