import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'





function App() {
  
  const backgroundDay = `background-image: url(https://w0.peakpx.com/wallpaper/973/575/HD-wallpaper-sunny-day-fence-pretty-wonderful-stunning-sunny-beautiful-clouds-nice-flowers-way-road-blue-amazing-sunlight-spring-sky-trees-summer-day-nature-meadow-grassland.jpg)`;
  const backgroundNight = `background-image: url(https://p4.wallpaperbetter.com/wallpaper/900/861/277/space-1920x1080-earth-wallpaper-preview.jpg)`;
  
  document.body.style = backgroundDay

  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let journey = hours >= 12 ? "PM" : "AM";
  minutes = ("0"+ minutes).slice(-2)
  seconds = ("0"+ seconds).slice(-2)
  let completeHour = `${hours} : ${minutes} : ${seconds} ${journey}`;


  const [weather, setWeather] = useState({});

  useEffect(()=>{
    function success(pos) {
      const crd = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=34b0973ddc0685853615f3f1dac36cdf`)
          .then(res => setWeather(res.data));
          console.log(weather);

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);
  },[]);
  
  const [ isKelvin, setIsKelvin ] = useState(true);

  const changeTemp = () => {
    setIsKelvin(!isKelvin);
  };
  
  const changeImgWeather = () => {
    if (celcius < 12){
      sunny
    } else {
      rainny
    }
  };
  
  

  const kelvin = weather.main?.temp;
  const fahrenheit = ((weather.main?.temp - 273.15)* 1.8000 + 32).toFixed(2);
  const celcius = (weather.main?.temp - 273.15).toFixed(2);


  const rainny = <img src="./src/assets/Img/Rain.png" alt=""></img>
  const sunny = <img src="https://static.vecteezy.com/system/resources/thumbnails/009/304/897/small_2x/sun-icon-set-clipart-design-illustration-free-png.png" alt=""></img>
  const milt = <img src="./src/assets/Img/mild.png" alt=""></img>
  

  return (
    
    <div className="App">
      <div className='container'>
        <div className='title_container'>
          <h1>Weather App</h1>
          <h2>{weather.name}, {" "} {weather.sys?.country} {" "} <br /><span>{completeHour}</span></h2>
        </div>
        <div className='info_container'>
          <section className='image_container'> 
            <h4>  {celcius > 12 ? sunny : rainny}     </h4>  
            <h4>  {isKelvin ? fahrenheit : celcius} {isKelvin ? "°F" : "°C"}</h4>
          </section>
          <ul className='info_weather'>
              <li className='cloudtype'> <b>"{weather.weather?.[0].description}"</b> </li>
              <li> <i className="fa-solid fa-wind"></i>             <b>Wind Speed</b> {weather.wind?.speed}</li>
              <li> <i className="fa-solid fa-cloud"></i>            <b>Clouds    </b> {weather.clouds?.all} %</li>
              <li> <i className="fa-solid fa-temperature-half"></i> <b>Pressure  </b> {weather.main?.pressure} Hpa</li>
          </ul>
        </div>
        <button className='button' onClick={changeTemp} style={{background:"blueviolet", color:"white", fontWeight:"bolder"}}>Degrees °F/°C</button>
      </div>
    </div>
  )
}

export default App
