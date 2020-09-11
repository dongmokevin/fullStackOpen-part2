import React, {useState, useEffect} from 'react';
import axios from 'axios'

//component to show the weather of a specifique country's capital
const Weather = ({displayedCountries}) => {
    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY
    const capital = displayedCountries[0].capital
    useEffect(() => {
      console.log('Effect')
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          console.log('promise fulfilled')
          setWeather(response.data)
          })
    }, [])

    if ( ! weather ) {
      return (
        <div></div>
      )
    }
    return (
      <div>
        <p><strong>temperature</strong> {weather.current.temperature} Celsius<br />
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/></p>
        <p><strong>wind</strong> {weather.current.wind_speed} mph, direction {weather.current.wind_dir}  </p>
      </div>		
    )

  }

  export default Weather