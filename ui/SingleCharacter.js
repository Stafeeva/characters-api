import React, { Component } from 'react'
import axios from 'axios'

import { withRouter, Link } from 'react-router-dom'

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

  handleDelete() {
    axios.delete('/api/character/' + this.state.name)
         .then(response => {
           this.props.history.push('/')
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

      <button onClick={() => this.handleDelete()}>Delete</button>
      <Link to={`/character/edit/${this.state.name}`}>Edit</Link>
      <Link to="/">Back</Link>
    </div>
  }

}

export default withRouter(SingleCharacter)
