import React, {useEffect, useState} from 'react'
import Weather from './Weather'

 //component to show countries details when state disp is true
 const ShowDetails = ({displayedCountries}) => {
      
    return (
      <div>
          <h1>{displayedCountries[0].name}</h1>
          <div>
            <p>capital {displayedCountries[0].capital}</p>
            <p>population {displayedCountries[0].population}</p>
          </div>
          <h2>Languages</h2>
          <div>
            <ul>
              {displayedCountries[0].languages.map(x => <li key={x.name}>{x.name}</li>)}
            </ul>
          </div>
          <div>
            <img src={displayedCountries[0].flag} alt="Country flag not found" width="150" height="150" />
          </div>
          <div>
            <h2>Weather in {displayedCountries[0].capital}</h2>
            <Weather displayedCountries={displayedCountries}/>
          </div>
        </div>
      )
}

export default ShowDetails