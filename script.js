const API_KEY = '1a8f49efd80db8c189bb16e06cd70e63'; // For Openweather API
const CLIENT_ID = 'KiROWCmL9ZKZnoWjHWJlIdCP5jLw2f_2ziSpzcUcqIY'; // For Unsplash API

const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-block");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const imgicon = document.querySelector(".icon");

// Call requestApi and requestApi_unsplash when put value in field and press "enter"
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value);
        requestApi_unsplash(inputField.value);
    }
})

function requestApi(value){ // return data from API call promise to weatheDetails function
   
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&exclude=minutely, hourly&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result));       
}

function requestApi_unsplash(value){ // return data from API call promise to UnsplashDetails function

    let api_unsplash = `https://api.unsplash.com/search/photos?query=${value}&client_id=${CLIENT_ID}`;
    fetch(api_unsplash)
        .then(response => response.json())
        .then(result => UnsplashDetails(result));
}

function weatherDetails(value){ // Get elements from API
    const {lat, lon} = value.coord;

    wrapper.querySelector(".location").innerHTML = "- "+value.name+" -";
    wrapper.querySelector(".one .weather").innerHTML = value.weather[0].description;
    wrapper.querySelector(".one .temp .numb").innerHTML = Math.round(value.main.temp);
    wrapper.querySelector(".one .min .numb").innerHTML = Math.round(value.main.temp_min);
    wrapper.querySelector(".one .max .numb").innerHTML = Math.round(value.main.temp_max);
    imgicon.querySelector(".icon1").src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
    
    console.log(value);
    // return data from API call promise to weatheDetails2 function
    let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api2)
        .then(response => response.json())
        .then(result => weatherDetails2(result));
    }

    function UnsplashDetails(value){
        const img_bg = value.results[0].urls.regular;        
        document.body.style.backgroundImage = `url(${img_bg})`;
        document.body.style.backgroundSize = 'cover';
        
        console.log(value);
    }
    
    
    function weatherDetails2(value){ // Get elements from API
        
        var allDays= ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        var d2 = new Date(value.daily[1].dt * 1000); // to get the DateTime. 
        var dayName_two = allDays[d2.getDay()]; // It will give day index, and based on index we can get day name from the array.
        var d3 = new Date(value.daily[2].dt * 1000);
        var dayName_thre = allDays[d3.getDay()];
        var d4 = new Date(value.daily[3].dt * 1000);
        var dayName_four = allDays[d4.getDay()];
        var d5 = new Date(value.daily[4].dt * 1000);
        var dayName_five = allDays[d5.getDay()];
        
        wrapper.querySelector(".day-two").innerHTML =dayName_two;
        document.querySelector(".icon2").src = `http://openweathermap.org/img/wn/${value.daily[1].weather[0].icon}.png`;
        wrapper.querySelector(".two .weather").innerHTML = value.daily[1].weather[0].description;
        wrapper.querySelector(".two .min .numb").innerHTML = Math.round(value.daily[1].temp.min);
        wrapper.querySelector(".two .max .numb").innerHTML = Math.round(value.daily[1].temp.max);

        wrapper.querySelector(".day-thre").innerHTML =dayName_thre;
        document.querySelector(".icon3").src = `http://openweathermap.org/img/wn/${value.daily[2].weather[0].icon}.png`;
        wrapper.querySelector(".thre .weather").innerHTML = value.daily[2].weather[0].description;
        wrapper.querySelector(".thre .min .numb").innerHTML = Math.round(value.daily[2].temp.min);
        wrapper.querySelector(".thre .max .numb").innerHTML = Math.round(value.daily[2].temp.max);
        
        wrapper.querySelector(".day-four").innerHTML =dayName_four;
        document.querySelector(".icon4").src = `http://openweathermap.org/img/wn/${value.daily[3].weather[0].icon}.png`;
        wrapper.querySelector(".four .weather").innerHTML = value.daily[3].weather[0].description;
        wrapper.querySelector(".four .min .numb").innerHTML = Math.round(value.daily[3].temp.min);
        wrapper.querySelector(".four .max .numb").innerHTML = Math.round(value.daily[3].temp.max);
        
        wrapper.querySelector(".day-five").innerHTML =dayName_five;
        document.querySelector(".icon5").src = `http://openweathermap.org/img/wn/${value.daily[4].weather[0].icon}.png`;
        wrapper.querySelector(".five .weather").innerHTML = value.daily[4].weather[0].description;
        wrapper.querySelector(".five .min .numb").innerHTML = Math.round(value.daily[4].temp.min);
        wrapper.querySelector(".five .max .numb").innerHTML = Math.round(value.daily[4].temp.max);

        console.log(value);

    }