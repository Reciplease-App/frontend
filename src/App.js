import { Route, Switch } from 'react-router-dom'

import Login from './components/LogIn'
import Landing from './components/Landing'
import SignUp from './components/SignUp'

function App() {
  return (
    <div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/' component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
