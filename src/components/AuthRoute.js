import React, { Suspense } from 'react';
import { Route, Redirect} from 'react-router-dom';

import LoadingScreen from './LoadingScreen';

const AuthRoute = ({component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={() => {
          if (!window.localStorage.getItem('token')) {
            return (
              <Suspense fallback={<LoadingScreen />}>
                <Redirect to="/login" />
              </Suspense>
            )
          } else {
            return (
                <Suspense fallback={<LoadingScreen />}>
                  <Component />
                </Suspense>
            )
          }
        }}
      />
    )
  }

export default AuthRoute