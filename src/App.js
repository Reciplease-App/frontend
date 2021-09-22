import { Route, Switch } from 'react-router-dom'

import Login from './components/LogIn'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import SearchPage from './components/Search'
import CookBook from './components/CookBook'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss'

function App() {
  return (
    <div className="body">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/search' component={SearchPage} />
        <Route path='/cookbook' component={CookBook} />
        <Route exact path='/' component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
