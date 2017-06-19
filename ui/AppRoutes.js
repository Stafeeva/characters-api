import React, { Component } from 'react'
import CharacterList from './CharacterList'
import AddCharacter from './AddCharacter'
import SingleCharacter from './SingleCharacter'

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
        <Route path='/character/:name' component={SingleCharacter} />
      </div>
    </Router>
  }

}

export default AppRoutes
