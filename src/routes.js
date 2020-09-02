import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

export default (
  <Switch>
    <Route exact path='/' component={Join} />
    <Route path='/chat' component={Chat} />
  </Switch>
);