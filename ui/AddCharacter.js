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

  handleChange(fieldName, fieldValue) {
    let newState = this.state
    newState[fieldName] = fieldValue
    this.setState(newState)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = this.state
    axios.post('/api/character', data)
         .then(response => {
           this.props.history.push('/')
         })
  }

  render() {
    const fields = Object.keys(this.state)

    return <div>
      <h2>Add character</h2>


        {fields.map(field => {
          return <div className="property" key={field}>
            <label>
              {field.replace('_', ' ')}: <input id={field} type="text" value={this.state[field].value} onChange={(e) => this.handleChange(field, e.target.value)} />
            </label>
          </div>
        })}

        <button className="button" id="addCharacterButton" onClick={this.handleSubmit}>Add character</button>
        <Link className="button" to="/">Back</Link>

    </div>
  }
}

export default withRouter(AddCharacter)
