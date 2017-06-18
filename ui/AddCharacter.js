import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class AddCharacter extends Component {

  render() {
    return <div>
      <h2>Add character here</h2>

      <Link to="/">Back</Link>
    </div>
  }
}

export default AddCharacter
