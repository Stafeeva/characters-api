import React, { Component } from 'react'
import axios from 'axios'

import { withRouter, Link } from 'react-router-dom'

class AddCharacter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      is_male: ''
  }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({name: event.target.value})
    console.log(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = this.state
    axios.post('/character', data)
         .then(response => {
           this.props.history.push('/')
         })
  }

  render() {
    return <div>
      <h2>Add character</h2>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Height:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add character" />
      </form>
      <Link to="/">Back</Link>
    </div>
  }
}

export default withRouter(AddCharacter)
