let documentHTML = document;

let url = `https://api.weatherapi.com/v1/forecast.json?key=${config.API_KEY}&q=${config.D_CITY}&days=${config.D_DAYS}&fbclid=IwAR3NiJunvxi6Ney5oxVhzx0bgx52ZTknIu1EelGjwFQ2fGlgwoSHzlg_Z2M`


/***Input***/

let city=documentHTML.getElementById('cityInput');
let getCityBtn= documentHTML.getElementById('getCityBtn');

/****Hoy********/
let dayHName= documentHTML.querySelector('.start__cont .dayName');
let dayHDate= documentHTML.querySelector('.start__cont .dayDate');

let cityName= documentHTML.querySelector('.start__cont .card-title')
let cityHoyTemp= documentHTML.querySelector('.start__cont .temp__value')
let cityHoyIcon= documentHTML.querySelector('.start__cont .temp__icon');
let cityHoyWeather= documentHTML.querySelector('.start__cont .card-text')

let cityHoyValues= documentHTML.querySelectorAll('.start__cont .footerTemp__data p ')

/*****Manana***********/ 
let dayMName= documentHTML.querySelector('.middle__cont .dayName');
let cityMananaTempMax= documentHTML.querySelector('.middle__cont .temp__valueMax')
let cityMananaTempMin= documentHTML.querySelector('.middle__cont .temp__valueMin')
let cityMananaWeather= documentHTML.querySelector('.middle__cont .card-text')
let cityMananaIcon= documentHTML.querySelector('.middle__cont .temp__icon')
 

/*******Pasado Manana************ */
let dayPMName= documentHTML.querySelector('.end__cont .dayName');
let cityPMananaTempMax= documentHTML.querySelector('.end__cont .temp__valueMax')
let cityPMananaTempMin= documentHTML.querySelector('.end__cont .temp__valueMin')
let cityPMananaWeather= documentHTML.querySelector('.end__cont .card-text')
let cityPMananaIcon= documentHTML.querySelector('.end__cont .temp__icon')


async function getWeatherDataInit(){
  let response;
  response = await fetch(url);  
  let data= await response.json();

  ////to get the temperature values 
  displayTemperatura(data);
 
  //to get the rest of the data 
  displayDataRemain(data);
  
  //to get the data of days and months  
  displayDate(data); 
}

async function getWeatherData(){
    let response;

    response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${config.API_KEY}&q=${city.value}&days=${config.D_DAYS}&fbclid=IwAR3NiJunvxi6Ney5oxVhzx0bgx52ZTknIu1EelGjwFQ2fGlgwoSHzlg_Z2M`);

    let data= await response.json();

    //to get the temperature values 
    displayTemperatura(data); 

    //to get the rest of the data 
    displayDataRemain(data);
    
    //to get the data of days and months  
    displayDate(data); 
}


function displayDataRemain(data){
    let {current, forecast, location }=  data;
    let [forecastHoy, forcastManana, forcastPasadoManana]=forecast.forecastday;
    cityName.innerHTML=`${location.name}, ${location.country}`;
    cityHoyWeather.innerHTML=`${current.condition.text}`;
    cityHoyValues[0].innerHTML=`${current.humidity} %`;
    cityHoyValues[2].innerHTML=`${current.wind_dir}`;

   cityMananaWeather.innerHTML=`${forcastManana.day.condition.text}`;
   cityPMananaWeather.innerHTML=`${forcastPasadoManana.day.condition.text}`;

   cityHoyIcon.src=`${current.condition.icon}`;
   cityMananaIcon.src=`${forcastManana.day.condition.icon}`;
   cityPMananaIcon.src=`${forcastPasadoManana.day.condition.icon}`;
}



 function displayTemperatura(data){
   let {current, forecast, location }=  data;
   let [forecastHoy, forcastManana, forcastPasadoManana]=forecast.forecastday;

   cityHoyTemp.innerHTML=`<h2 class="temp__value">${current.temp_c
   } <span>&#8451</span></h2>`;

   cityHoyValues[1].innerHTML=`${current.wind_kph} Km/h`;


   cityMananaTempMax.innerHTML=`<h2 class="temp__valueMax">${forcastManana.day.maxtemp_c
   } <span>&#8451</span></h2>`;

   cityPMananaTempMax.innerHTML=`<h2 class="temp__valueMax">${forcastPasadoManana.day.maxtemp_c
   } <span>&#8451</span></h2>`;

   cityMananaTempMin.innerHTML=`<h2 class="temp__valueMin">${forcastManana.day.mintemp_c
   } <span>&#8451</span></h2>`;

   cityPMananaTempMin.innerHTML=`<h2 class="temp__valueMin">${forcastPasadoManana.day.mintemp_c
   } <span>&#8451</span></h2>`;

}


function getHDate(data){
  let date =  new Date (data.localtime);
  dayHName.innerHTML=decDay(date.getDay());
  dayHDate.innerHTML= `${decMonth(date.getMonth())} ${date.getDate()}`
}


function getMDate(data){
    let date =  new Date (data.date);
    // console.log(date);
    dayMName.innerHTML=decDay(date.getDay());
  }

  function getPMDate(data){
    let date =  new Date (data.date);
    // console.log(date);
    dayPMName.innerHTML=decDay(date.getDay());
  }

function decDay(getDay){
    let day='';
    switch(getDay){
        case(0): day='Sunday'; break;
        case(1): day='Monday'; break;
        case(2): day='Tuesday'; break;
        case(3): day='Wednesday'; break;
        case(4): day='Thursday'; break;
        case(5): day='Friday'; break;
        case(6): day='Saturday'; break;
        default: day=''; break;
    }
    return day;
}

function decMonth(getMonth){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let name = month[getMonth];
    //console.log(name)
    return name;
}

 function displayDate(data){
   let { forecast, location }=  data;
   getHDate(location);
   getMDate(forecast.forecastday[1]);
   getPMDate(forecast.forecastday[2]);
 }

 function keyBoardFind(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getWeatherData();
    }
  }




/*******************************Event Listener*************************** */

window.addEventListener("DOMContentLoaded", function () {
    getWeatherDataInit();
    
});

getCityBtn.addEventListener("click", function () {
    getWeatherData();
});

city.addEventListener("input", function () {
    getWeatherData();
});

//fire the keyBoardLogIn function when a specific key is Pressed Down
documentHTML.addEventListener("keydown", keyBoardFind);


