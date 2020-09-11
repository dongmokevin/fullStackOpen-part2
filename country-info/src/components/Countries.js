import React, {useState, useEffect} from 'react';
import ShowDetails from './ShowDetails'

const Countries = ({country, newSearch, setNewSearch}) => {
    //variable to store the countries to be displayed
    var displayedCountries = country
  
    if (newSearch) {
      
      //filters the countries based on the the search input
      displayedCountries = country.filter(x => x.name.toLowerCase().includes(newSearch.toLowerCase()))
  
      if(displayedCountries.length > 10) {
  
        return (
          <div>Too many matches, specify another filter</div>
        )
  
      }
      
      if(displayedCountries.length === 1) {
        return (
          <ShowDetails displayedCountries={displayedCountries} />
        )
      }
  
      const handleShow = (event) => {
        setNewSearch(event.target.attributes.countryname.value)
  
      }
  
      return (
        <div>
          {displayedCountries.map(
            x => 
            <div key={x.name}>
              {x.name} 
              <button onClick={handleShow} countryname={x.name}>show</button>
            </div>
          )}
        </div>
      )
    }
    return (
      <div>
        {displayedCountries.map(x => <p key={x.name}>{x.name}</p>)}
      </div>
    )
  }

  export default Countries
