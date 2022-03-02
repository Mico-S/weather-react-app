import React, {useState} from 'react'
import axios from 'axios'

function App() {
  // Initializing our state and setState variables for our weather
  // data and location input from user
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  // OpenWeatherMap API request URL
  // Parameters: city, API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c02bacfef72fca3b23d3c402e65dc9f7`

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
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>65 F</h1>
          </div>
          <div className="description">
            <p>Clear Skies</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">72 deg F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">15%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">5 MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
