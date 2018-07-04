import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { isAuthenticated, validate } from 'common/auth'
import * as scenes from 'scenes'

export const LOGIN_URI = '/login'
export const HOME_URI = '/'
export const SIGNUP_URI = '/signup'

const routes = [
  // {
  //   path: LOGIN_URI,
  //   component: scenes.Login,
  //   authenticated: false,
  // },
  // {
  //   path: SIGNUP_URI,
  //   component: scenes.Signup,
  //   authenticated: true,
  // },
  {
    path: '/workshops/:id/:slide',
    component: scenes.Workshop,
  },
  {
    path: '/workshops/:id',
    exact: true,
    render: ({ match }) => <Redirect to={`/workshops/${match.params.id}/0`} />,
  },
  {
    path: HOME_URI,
    exact: true,
    component: scenes.Home,
    authenticated: true,
  },
]

// function protectedRoute(Component, authenticated) {
//   return (props) => {
//     const auth = isAuthenticated()
//     if ((authenticated && auth) || (!authenticated && !auth)) {
//       return <Component {...props} />
//     } else {
//       return <Redirect to={authenticated ? LOGIN_URI : HOME_URI} />
//     }
//   }
// }

export default () => (
  <Switch>
    {/*
    <Route
      path="/oauth2callback"
      render={(props) => {
        const params = new URLSearchParams(props.location.hash.substr(1))
        validate(params.get('access_token'))
        return <p>loading...</p>
      }}
    />
    */}
    {routes.map(({ path, ...other }) => {
      return <Route key={path} path={path} {...other} />
    })}
  </Switch>
)
/*render={protectedRoute(route.component, route.authenticated)}*/
