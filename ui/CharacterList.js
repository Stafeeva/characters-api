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

  render() {
    return <div>
        <Link to="/character/add">Add character</Link>

        {this.state.characters.map(character => {
          return <div key={character.name}>
            <h3><Link to={`/character/view/${character.name}`}>{character.name}</Link>
            </h3>
          </div>
        })}
      </div>
  }
}

export default CharacterList
