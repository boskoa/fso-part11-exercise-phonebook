import React from 'react'

const Contact = ({ person, action }) => {
  return (
    <div>
      {person.name} {person.number}
      <button type="submit" onClick={action}>delete</button>
    </div>
  )
}

export default Contact