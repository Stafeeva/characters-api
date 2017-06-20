import React, { Component } from 'react'
import axios from 'axios'

import { withRouter, Link } from 'react-router-dom'

class SingleCharacter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      character : {},
      is_favourite : false
    }
  }

  componentDidMount() {
    const characterName = this.props.match.params['name']
    axios.get(`/api/character/${characterName}`)
         .then(response => {
           let state = this.state
           state.character = response.data
           this.setState(state)
         })
    axios.get('/api/favourite')
         .then(response => {
           const favourites = response.data

          if (favourites.hasOwnProperty(characterName) &&
              favourites[characterName] == true) {
            let state = this.state
            state.is_favourite = true
            this.setState(state)
          } else {
            let state = this.state
            state.is_favourite = false
            this.setState(state)
          }
         })
  }

  handleDelete() {
    axios.delete('/api/character/' + this.state.character.name)
         .then(response => {
           this.props.history.push('/')
         })
  }

  removeFavourite()  {
    axios.delete('/api/favourite/' + this.state.character.name)
    .then(response => {
      let state = this.state
      state.is_favourite = false
      this.setState(state)
    })
  }

  addFavourite() {
    axios.post('/api/favourite/' + this.state.character.name)
    .then(response => {
      let state = this.state
      state.is_favourite = true
      this.setState(state)
    })
  }

  render() {
    const fields = Object.keys(this.state.character)

    return <div>
      <h2>{this.state.character.name}</h2>

      {fields.map(field => {
        return <div key={field}>
            {field.replace('_', ' ')}:
            {this.state.character[field]}
        </div>
      })}

      {this.state.is_favourite ? (
        <button onClick={() => this.removeFavourite()}>Remove favourite</button>
      ) : (
        <button onClick={() => this.addFavourite()}>Add favourite</button>
      )}

      <button onClick={() => this.handleDelete()}>Delete</button>
      <Link to={`/character/edit/${this.state.character.name}`}>Edit</Link>
      <Link to="/">Back</Link>
    </div>
  }

}

export default withRouter(SingleCharacter)
