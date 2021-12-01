import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const AuthRoute = ({component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={() => {
          if (!window.localStorage.getItem('token')) {
            return (
              <Redirect to="/login" />)
          } else {
            return (
                <Component />
            )
          }
        }}
      />
    )
  }

  export default AuthRoute