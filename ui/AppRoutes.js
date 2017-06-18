import React, { Component } from 'react'
import CharacterList from './CharacterList'
import AddCharacter from './AddCharacter'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class AppRoutes extends Component {

  render() {
    return <Router>
      <div>
        <Route exact path='/' component={CharacterList} />
        <Route path='/add-character' component={AddCharacter} />
      </div>
    </Router>
  }

}

export default AppRoutes
