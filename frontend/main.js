import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, Redirect, history } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

import Form from './src/form';
import App from './src/app';
import Detail from './src/detail'

const routes = (
  <Router history={History}>
    <Redirect from="/" to="people" />
      <Route path="/" component={ App }>
          <Route path="people" component={ Form } >
            <Route path=":id" conponent={ Detail } />
          </Route>
      </Route>
  </Router>
);


render(routes, document.getElementById('root'));
