import React, { Component } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

class SingleCharacter extends Component {

  constructor(props) {
    super(props)
    this.state = { name: props.name }
  }

  componentDidMount() {
    const name = this.props.name
    console.log(name)
    axios.get(`/character/${this.props.name}`)
         .then(response => {
           this.setState({
             name: name
           })
         })
  }

  render() {
    return <div>
      <h2>{this.state.name}</h2>
      <h3>Edit</h3>
      <Link to="/">Back</Link>
    </div>
  }

}

export default SingleCharacter
