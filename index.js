
  /*const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
  
  const alertTrigger = document.getElementById('liveAlertBtn')
  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      alert('Nice, you triggered this alert message!', 'success')
    })
  }
  const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */

  

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday ",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let currentDate1 = new Date();
  let cDay = currentDate1.getDate();
  let cMonth = months[currentDate1.getMonth()];
  let cYear = currentDate1.getFullYear();
  let cDayWeek = days[currentDate1.getDay()];
  
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  const d = new Date();
  let h = d.getHours();
  let m = addZero(d.getMinutes());
  let ctime = h + ":" + m;
  
  document.querySelector(".currentDate").innerHTML = `${cDayWeek} ${cMonth} ${cDay}, ${cYear}  ${ctime}`;
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    return days[day];
  }
  function displayForecast(response) {
    
    let forecast = response.data.daily;
    console.log(forecast);
    let forecastElement = document.querySelector("#forecast");

    
  
    let forecastHTML = `<div class="row">`;
   
    forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
      forecastHTML =
        forecastHTML + 
        `
        <div class="col">
                <img src= "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                class="img-top"
                width="45"
                alt=weather-emoji 
                id=icon>
        
        <div class= "forecastDay">${formatDay(forecastDay.time)}</div>
        <div class= "forecastHigh">${Math.round(forecastDay.temperature.maximum)} ??F</div>
        <div class= "forecastLow">${Math.round(forecastDay.temperature.minimum)} ??F</div>
    
        
           </div>
    `;}
  });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }





  
function forecast (coordinates) {

let key = "9f93aofdc8e0492e30c4aetee787abea";
let url =
`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=imperial`;
axios.get(url).then(displayForecast);
}





  function showWeather(response) {
    console.log(response);
    let temp = Math.round(response.data.temperature.current);
    let wind = Math.round(response.data.wind.speed);
    document.querySelector("#currentCity").innerHTML = `${response.data.city}`;
    document.querySelector(".tempnow").innerHTML = `${temp} ??F`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    document.querySelector(".windspeed").innerHTML = `Wind: ${wind} mph`;
    let iconElement = document.querySelector("#icon");
    
    iconElement.setAttribute("src", `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);


  forecast(response.data.coordinates);
    }

  
  
  function searchCity(citySearch) {
    let key = "9f93aofdc8e0492e30c4aetee787abea";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citySearch}&key=${key}&units=imperial`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function retrieveSearchLocation(position) {
    let key = "9f93aofdc8e0492e30c4aetee787abea";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${key}&units=imperial`;
    axios.get(url).then(showWeather);
  }
  function getSearchPosition(event) {
    event.preventDefault();
    let citySearch = document.querySelector("#city-search").value;
    searchCity(citySearch);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrieveSearchLocation);
  }
  
  let currentElement = document.querySelector("#currentbtn");
  currentElement.addEventListener("click", getCurrentPosition);
  
  let searchElement = document.querySelector("#searchbtn");
  searchElement.addEventListener("click", getSearchPosition);
  
  searchCity("London");