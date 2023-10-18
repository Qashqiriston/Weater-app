import { useState } from "react"

const api = {
  key: 'dde480240f288e3c2daa34a36e28b201',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = e => {
    if(e.key === 'Enter'){
      fetch(` ${api.baseUrl}weather?q=${query}&units=metrick&APPID=${api.key} `)
      .then(res => res.json())
      .then((result) => {setWeather(result);
      setQuery("")
      console.log(result);
      })
    }
  }

  const dataBuilder = a => {
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
      "Monday",
      'Tuesday',
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[a.getDay()]
    let data = a.getDate()
    let month = months[a.getMonth()]
    let year = a.getFullYear()

    return `${day} ${data} ${month} ${year}`
  }
  

  return (
   <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 200)? 'app' : 'app cold' ) : 'app'}>
    <main>
      <div className="search-box">
      <input type="text" className="search-bar" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} onKeyPress = {search} />
      </div>

      {typeof weather.main != 'undefined' ? (
        <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country} </div>
            <div className="date">{dataBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">{(Math.round(weather.main.temp))}℉</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
      </div>
      ) : ("")}
      
      
    </main>
   </div>
  )
}

export default App
