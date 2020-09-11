import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const Form = ({newSearch, handleSearch}) => {
  return (
    <div>
      Find countries <input value = {newSearch} onChange = {handleSearch} />
    </div>
  )
}

const App = () => {
  const [ country, setCountry ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('Effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
        })
  }, [])

  const handleSearch = (event) => {
      setNewSearch(event.target.value)
      console.log(event.target.value)
  }

  return (
    <div>
      <Form newSearch = {newSearch} handleSearch={handleSearch} />
      <Countries country = {country} newSearch={newSearch} setNewSearch = {setNewSearch}/>
    </div>
  )
}

export default App;
