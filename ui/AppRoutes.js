import React, { Component } from 'react'
import CharacterList from './CharacterList'
import AddCharacter from './AddCharacter'
import ViewCharacter from './ViewCharacter'
import EditCharacter from './EditCharacter'

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
        <Route path='/character/add' component={AddCharacter} />
        <Route path='/character/view/:name' component={ViewCharacter} />
        <Route path='/character/edit/:name' component={EditCharacter} />
      </div>
    </Router>
  }

}

export default AppRoutes
