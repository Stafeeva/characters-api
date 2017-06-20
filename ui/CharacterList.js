import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class CharacterList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      characters : [],
      favourites : {}
    }
  }

  loadCharacters() {
    axios.get('/api/character')
         .then(response => {
           let state = this.state
           state.characters = response.data
           this.setState(state)
         })
  }

  loadFavourites() {
    axios.get('/api/favourite')
         .then(response => {
           const favourites = response.data
           let state = this.state
           state.favourites = favourites
           this.setState(state)
         })
  }

  componentDidMount() {
    this.loadCharacters()
    this.loadFavourites()
  }

  render() {
    return <div>
        <Link to="/character/add">Add character</Link>

        {this.state.characters.map(character => {
          return <div key={character.name}>
            <h3>

            {this.state.favourites[character.name] &&
              <span>★</span>
            }

            <Link to={`/character/view/${character.name}`}>{character.name}</Link>
            </h3>
          </div>
        })}
      </div>
  }
}

export default CharacterList
