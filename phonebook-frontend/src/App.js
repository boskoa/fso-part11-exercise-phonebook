import React, { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookServices from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState({text: null, style: null})

  const nStyle = {
    color: "green",
    border: "2px solid green",
    borderRadius: "5px",
    padding: "5px",
    background: "lightgrey",
    fontSize: "15px",
    marginBottom: "10px"
  }
  const eStyle = {
    color: "red",
    border: "2px solid red",
    borderRadius: "5px",
    padding: "5px",
    background: "lightgrey",
    fontSize: "15px",
    marginBottom: "10px"
  }

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    for (let i of persons) {
      if (i.name === newName) {
        const change = window.confirm(`${newName} is already added to the phonebook. \
Replace the old number with the new one?`)
        if (change) {
          phonebookServices
          .updatePhonebook(personObject, i.id)
          .then(response => setPersons(persons.map(p => {
            return (
              p.name === response.name ?
              response :
              p
            )
          })))
          .catch(error => {
            setMessage({
              text: `Information for ${i.name} has already been removed from server.`,
              style: eStyle
            })
            setTimeout(() => setMessage({text: null, style: null}), 5000)
          })
          setMessage({
            text: `Phone number was updated for ${i.name}`,
            style: nStyle
          })
          setTimeout(() => setMessage({text: null, style: null}), 5000)
        }

        setNewName('')
        setNewNumber('')
        return
      }
    }

    phonebookServices
      .createEntry(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        setMessage({
        text: `Added ${personObject.name}`,
        style: nStyle
        })
        setTimeout(() => setMessage({text: null, style: null}), 5000)
      })
      .catch(error => {
        if (error.response.status === 400) {
          setMessage({
            text: `${error.response.data.error}`,
            style: eStyle
          })
          setTimeout(() => setMessage({text: null, style: null}), 5000)
        }
      })
  }

  const removePerson = person => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      phonebookServices.removeEntry(person.id)
      .catch(error => {
        setMessage({
          text: `Information for ${person.name} has already been removed from server.`,
          style: eStyle
        })
        setTimeout(() => setMessage({text: null, style: null}), 5000)
      })
      setPersons(persons.filter(p => p.id !== person.id))
      setMessage({
        text: `Removed ${person.name}`,
        style: nStyle
      })
      setTimeout(() => setMessage({text: null, style: null}), 5000)
    }
  }

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message.text} style={message.style} />
      <Filter onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {filter ? 
          persons.filter(person =>
            person.name.toLowerCase()
            .includes(filter.toLowerCase())).map((person) =>
              <Contact key={person.id} person={person} action={() => removePerson(person)} />
          ) :
          persons.map((person) =>
            <Contact key={person.id} person={person} action={() => removePerson(person)} />
          )
        }
      </div>
    </div>
  )
}

export default App;