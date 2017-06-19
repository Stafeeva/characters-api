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
    axios.get('/character')
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
    event.preventDefault()

    axios.delete('/character/' + name)
         .then(response => {
           this.loadCharacters()
         })
  }

  render() {
    return <div>
        <h2>Characters</h2>

        <Link to="/add-character">Add character</Link>

        {this.state.characters.map(character => {
          return <div key={character.name}>
            <h3><Link to={`/character/${character.name}`}>{character.name}</Link>
              <button onClick={() => this.handleDelete(character.name)}>Delete character</button>
              <button onClick={() => this.handleUpdate(character.name)}>Update character</button>
            </h3>
          </div>
        })}
      </div>
  }
}

export default CharacterList
