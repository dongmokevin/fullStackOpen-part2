import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonService from './services/services'
import './index.css'

const Person = ({persons, newFilter, deletePerson}) => {
  var filterToShow = persons
  if(newFilter) {
    filterToShow = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))
  }

  return (
  <div>{filterToShow.map(x => <div key={x.name}> {x.name} {x.number} <button onClick={deletePerson} name={x.name} id={x.id}>delete</button> </div>)}</div>
  )
}

const Filter = ({newFilter, handleFilter}) => {
	return (
		<div>
		  filter shown with <input
			value={newFilter}
			onChange = {handleFilter}
		  />
	  </div>
	)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
        <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newPhone} onChange={props.handlePhoneChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({message, messageType}) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={messageType}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('237 690 00 00 00')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('warning')

  const getAll = useEffect(() => {
    console.log('Effect')
    PersonService
      .getAll()
      .then(response => {
        setPersons(response)
        })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    const inputName = {
      name : newName,
      number : newPhone,
      id : persons.length + 1
    }

    if(!persons.some(x => x.name === inputName.name)) {
      PersonService
        .create(inputName)
        .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewPhone('')
      })

      //success message
      setMessageType('success')
      setErrorMessage(
        `Added ${inputName.name}`
      )
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType('warning')
      }, 5000)

    } else {
      if (window.confirm(`${inputName.name} is already added to phonebook, replace the old number with a new one ?`)) {
        const person = persons.find(x => x.name === inputName.name)
        const changedPerson = {...person, number : inputName.number}
        PersonService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(x => x !== person.id ? x : returnedPerson))

            //warning message
            setMessageType('success')
            setErrorMessage(
              `Successsfully updated ${inputName.name} with phone number ${inputName.number}`
            )
            setTimeout(() => {
              setErrorMessage(null)
              setMessageType('warning')
            }, 4000)
          })
          .catch (error => {
            setErrorMessage(
              `Information from ${inputName.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const deletePerson = (event) => {

    console.log('delete')
    const personsName = event.target.attributes.name.value
    const personsId = event.target.attributes.id.value
    event.preventDefault()

    if (window.confirm(`Delete ${personsName} ?`)) {
      PersonService
      .remove(personsId)
      .then(() => {
        PersonService
          .getAll()
          .then(response => {
            setPersons(response)
            })
      })

      setMessageType('error')
      setErrorMessage(
        `${personsName} was successfully deleted`
      )
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType('warning')
      }, 5000)

    }
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} messageType={messageType} />
      <Filter newFilter = {newFilter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Person persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
