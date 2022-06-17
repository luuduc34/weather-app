const API_KEY = '1a8f49efd80db8c189bb16e06cd70e63';
const CLIENT_ID = 'KiROWCmL9ZKZnoWjHWJlIdCP5jLw2f_2ziSpzcUcqIY';

const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-block");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const minmax = document.querySelector(".minmax");
const imgicon = document.querySelector(".icon");

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value !=""){
        requestApi(inputField.value);
        requestApi_unsplash(inputField.value);
    }
})

function requestApi(value){
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}&units=metric&lang=fr`;
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result));
}

function requestApi_unsplash(value){
    let api_unsplash = `https://api.unsplash.com/search/photos?query=${value}&client_id=${CLIENT_ID}`;
    fetch(api_unsplash)
        .then(response => response.json())
        .then(result => UnsplashDetails(result));
}

function weatherDetails(value){
    const city = value.city.name;
    const {id, description, icon} = value.list[0].weather[0];
    const {temp, temp_min, temp_max} = value.list[0].main;
    const day1 = value.list[0].dt_txt;
    const day2 = value.list[8].dt_txt;
    const iconcode = value.list[0].weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${iconcode}@4x.png`;

    var allDays= ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var d2 = new Date(value.list[8].dt * 1000); // to get the DateTime. 
    var dayName_two = allDays[d2.getDay()]; // It will give day index, and based on index we can get day name from the array.
    var d3 = new Date(value.list[16].dt * 1000);
    var dayName_thre = allDays[d3.getDay()];

    var d4 = new Date(value.list[24].dt * 1000);
    var dayName_four = allDays[d4.getDay()];

    var d5 = new Date(value.list[32].dt * 1000);
    var dayName_five = allDays[d5.getDay()];

    wrapper.querySelector(".location").innerHTML = "- "+city+" -";
    wrapper.querySelector(".one .weather").innerHTML = description;
    wrapper.querySelector(".one .temp .numb").innerHTML = temp;
    minmax.querySelector(".min .numb").innerHTML = temp_min;
    minmax.querySelector(".max .numb").innerHTML = temp_max;
    imgicon.querySelector(".icon1").src = iconurl;
    
    wrapper.querySelector(".day-two").innerHTML =dayName_two;
    document.querySelector(".icon2").src = `http://openweathermap.org/img/wn/${value.list[8].weather[0].icon}.png`;
    wrapper.querySelector(".two .weather").innerHTML = value.list[8].weather[0].description;
    wrapper.querySelector(".two .temp .numb").innerHTML = value.list[8].main.temp;
    wrapper.querySelector(".two .min .numb").innerHTML = value.list[8].main.temp_min;
    wrapper.querySelector(".two .max .numb").innerHTML = value.list[8].main.temp_max;
    
    wrapper.querySelector(".day-thre").innerHTML =dayName_thre;
    document.querySelector(".icon3").src = `http://openweathermap.org/img/wn/${value.list[16].weather[0].icon}.png`;
    wrapper.querySelector(".thre .weather").innerHTML = value.list[16].weather[0].description;
    wrapper.querySelector(".thre .temp .numb").innerHTML = value.list[16].main.temp;
    wrapper.querySelector(".thre .min .numb").innerHTML = value.list[16].main.temp_min;
    wrapper.querySelector(".thre .max .numb").innerHTML = value.list[16].main.temp_max;

    wrapper.querySelector(".day-four").innerHTML =dayName_four;
    document.querySelector(".icon4").src = `http://openweathermap.org/img/wn/${value.list[24].weather[0].icon}.png`;
    wrapper.querySelector(".four .weather").innerHTML = value.list[24].weather[0].description;
    wrapper.querySelector(".four .temp .numb").innerHTML = value.list[24].main.temp;
    wrapper.querySelector(".four .min .numb").innerHTML = value.list[24].main.temp_min;
    wrapper.querySelector(".four .max .numb").innerHTML = value.list[24].main.temp_max;
    
    wrapper.querySelector(".day-five").innerHTML =dayName_five;
    document.querySelector(".icon5").src = `http://openweathermap.org/img/wn/${value.list[32].weather[0].icon}.png`;
    wrapper.querySelector(".five .weather").innerHTML = value.list[32].weather[0].description;
    wrapper.querySelector(".five .temp .numb").innerHTML = value.list[32].main.temp;
    wrapper.querySelector(".five .min .numb").innerHTML = value.list[32].main.temp_min;
    wrapper.querySelector(".five .max .numb").innerHTML = value.list[32].main.temp_max;

    console.log(value);

    }

    function UnsplashDetails(value){
        const img_bg = value.results[0].urls.regular;        
        document.body.style.backgroundImage = `url(${img_bg})`;
        document.body.style.backgroundSize = 'cover';
        
        console.log(value);
    }