import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './styles/app.scss';
import { Suspense } from 'react';
import AuthRoute from './components/AuthRoute';
import LoadingScreen from './components/LoadingScreen';
import Landing from './components/Landing';
const Login = React.lazy(() => import('./components/LogIn'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const SearchPage = React.lazy(() => import('./components/Search'))

function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Suspense fallback={<LoadingScreen/>}>
          <Login/>
        </Suspense>
      </Route>
      <Route path='/signup'>
        <Suspense fallback={<LoadingScreen/>}>
          <SignUp/>
        </Suspense>
      </Route>
      <AuthRoute path="/search" component={SearchPage} />
      <Route exact path='/'>
        <Landing/>
      </Route>
    </Switch>
  );
}

export default App;
