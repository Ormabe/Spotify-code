import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

import Form from './src/form';
import App from './src/app';
import Detail from './src/detail';
import NotFound from './src/not-found';



const routes = (
  <Router history={browserHistory} >
      <Route path="/" component={ App }>
          <IndexRoute component={ Form } />
          <Route path="people" component={ Form } />
            <Route path=":id" component={ Detail } />
          <Redirect from="/" to="people" />
      </Route>
      <Route path="*" component={NotFound}/>
  </Router>
);


render(routes, document.getElementById('root'));
