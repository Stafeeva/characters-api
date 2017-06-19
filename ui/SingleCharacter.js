import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class SingleCharacter extends Component {

  constructor(props) {
    super(props)
    this.state = { name: 'initial' }
  }

  componentDidMount() {
    axios.get(`/api/character/${this.props.match.params['name']}`)
         .then(response => {
           this.setState(response.data)
         })
  }

  render() {

    const fields = Object.keys(this.state)

    return <div>
      <h2>{this.state.name}</h2>

      {fields.map(field => {
        return <div key={field}>
            {field.replace('_', ' ')}:
            {this.state[field]}
        </div>

      })}

      <h3>Edit</h3>

      <Link to="/">Back</Link>
    </div>
  }

}

export default SingleCharacter
