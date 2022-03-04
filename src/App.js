import React, {useState} from 'react'
import axios from 'axios'

function App() {
  // Initializing our state and setState variables for our weather
  // data and location input from user
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  // OpenWeatherMap API request URL
  // Parameters: city, API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=c02bacfef72fca3b23d3c402e65dc9f7`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(apiUrl).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {/* x ? y : z 
            Essentially an inline if-statement, read as
            if x, then y, else z (good to know)*/}
            {data.name ? <p>{data.name}, {data.sys.country}</p> : <p>Enter a location!</p>}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(1)} °F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* If there is a given name, display the bottom box*/}
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed(1)} °F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed(1)} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
