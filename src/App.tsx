import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './utils/Router';
import {Provider} from "react-redux";
import store from './utils/store/store';

const Notifications = require('react-notifications');

export default class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Router/>
            <Notifications.NotificationContainer/>
        </Provider> 
      </BrowserRouter>
    );
  }
}
