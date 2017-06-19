import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class CharacterList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      characters : []
    }
  }

  loadCharacters() {
    axios.get('/api/character')
         .then(response => {
           this.setState({
             characters : response.data
           })
         })
  }

  componentDidMount() {
    this.loadCharacters()
  }

  handleDelete(name) {
    axios.delete('/api/character/' + name)
         .then(response => {
           this.loadCharacters()
         })
  }

  handleUpdate() {
    console.log('you clicked a button!')
  }

  render() {
    return <div>
        <h2>Characters</h2>

        <Link to="/character/add">Add character</Link>

        {this.state.characters.map(character => {
          return <div key={character.name}>
            <h3><Link to={`/character/view/${character.name}`}>{character.name}</Link>
              <button onClick={() => this.handleDelete(character.name)}>Delete</button>
              <button onClick={() => this.handleUpdate(character.name)}>Edit</button>
            </h3>
          </div>
        })}
      </div>
  }
}

export default CharacterList
