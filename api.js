//Api details
const weatherApi = {
    key : "8121864e6ae43f00e7287c06676caae7",
    baseUrl : "https://api.openweathermap.org/data/2.5/weather"
};

const flagApi = {
  baseUrl : "https://countryflagsapi.com/svg"
};

//getting country name from user
const inputcountry = document.getElementById('inputcountryid');
inputcountry.addEventListener('keypress',(event) =>{
    if(event.keyCode==13){
    getweatherreport(inputcountry.value); //calling function
    getflags(inputcountry.value); //calling function
    }
});

// fetching details from openweather API
function getweatherreport(countryname){
    fetch(`${weatherApi.baseUrl}?q=${countryname}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showweatherreport);
}

// fetching details from countryflags API
function getflags(countryname){
  const flag = `https://countryflagsapi.com/svg/${countryname}`;
  document.getElementById("ficon").src = flag;
}

//Showing details on screen
function showweatherreport(weather){
    let countryname = document.getElementById('country');
    countryname.innerText= `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let weathertype = document.getElementById('weather');
    weathertype.innerText=`${weather.weather[0].main}`;

    let ddate= document.getElementById('date');
    var nowDate = new Date();
    var date = nowDate.getDate()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getFullYear();
    ddate.innerText=`${date}`;

    let weathericon = document.getElementById('wicon');
    iconurl='http://openweathermap.org/img/wn/';
    idicon=`${weather.icon}`;
    source=`${iconurl}${weather.weather[0].icon}.png`;
    weathericon.setAttribute("src",source);

    if (weathertype.textContent=='Clear'){
      document.body.style.backgroundImage="url('./images/clear.jpg')";
    }
    else if(weathertype.textContent=='Thunderstorm'){
      document.body.style.backgroundImage="url('./images/thunderstrom.jpg')";
    }
    else if(weathertype.textContent=='Snow'){
      document.body.style.backgroundImage="url('./images/snow.jpg')";
    }
    else if(weathertype.textContent=='Clouds'){
      document.body.style.backgroundImage="url('./images/clouds.jpg')";
    }
    else if(weathertype.textContent=='Rain'){
      document.body.style.backgroundImage="url('./images/rain.jpg')";
    }
    else if(weathertype.textContent=='Drizzle'){
      document.body.style.backgroundImage="url('./images/drizzle.jpg')";
    }
    else {
      document.body.style.backgroundImage="url('./images/atmosphere.jpg')";
    }
}

//changing app icon in night
let nicon = document.getElementById('app-icon');
var hrs = [19,20,21,22,23,00,01,02,03,04,05];  //night icon 7pm to 5pm
var d = new Date();
var n = d.getHours();
if (hrs.includes(n)){
  nicon.setAttribute("src",`./images/icon-night.png`);
}else{
  nicon.setAttribute("src","./images/icon.png");
}

//clearing input press enter and setting to default
const INPUT = document.getElementById('inputcountryid');
  INPUT.addEventListener('keypress',(event) =>{
    if(event.keyCode==13  && $(INPUT).val()==''){
      location.reload();
    }
});
