import React, { Component } from 'react'
import axios from 'axios'

class CharacterList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      characters : []
    }
  }

  componentDidMount() {
    var self = this
    axios.get('/character')
         .then(response => {
           self.setState({
             characters : response.data
           })
         })
  }

  render() {
    return <div>
        <h2>Characters</h2>
        {this.state.characters.map(character => {
          return <div key={character.name}>
            <h3>{character.name}</h3>
          </div>
        })}
      </div>
  }
}

export default CharacterList
