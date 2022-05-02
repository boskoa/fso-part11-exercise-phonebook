import React from 'react'

const Notification = ({ text, style }) => {
  if (text === null) {
    return null
  }
  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification