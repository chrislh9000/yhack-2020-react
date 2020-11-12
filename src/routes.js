import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import MainPage from './components/MainPage';
import PageTwo from './components/PageTwo';


/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <Route component={MainPage} />
    <Route path="/some/pagetwo" component={PageTwo} />
  </Route>
);
