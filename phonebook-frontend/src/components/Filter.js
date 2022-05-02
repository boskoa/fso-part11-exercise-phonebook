import React from "react"

const Filter = ({ onChange }) => {
  return (
    <div id="filter">
      filter shown with: <input type="text" onChange={onChange} />
    </div>
  )
}

export default Filter