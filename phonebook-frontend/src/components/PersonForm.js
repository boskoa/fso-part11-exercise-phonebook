import React from 'react'

const UserInput = ({ value, onChange }) => {
  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <UserInput value={newName} onChange={handleNameChange} />
        <UserInput value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm