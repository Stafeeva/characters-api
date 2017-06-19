import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class Character extends Component {

  constructor(props) {
    super(props)
    this.state = { name: 'Chewbacca' }
  }

  componentDidMount() {
    axios.get('/character/Chewbacca')
         .then(response => {
           this.state
         })
  }

  render() {
    return <div>
      <h2>{this.name}</h2>
      <h3>Edit</h3>
      <Link to="/">Back</Link>
    </div>
  }

}

export default Character
