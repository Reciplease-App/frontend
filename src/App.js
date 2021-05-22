import { Route, Switch } from 'react-router-dom'

import Login from './components/LogIn'
import Landing from './components/Landing'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
