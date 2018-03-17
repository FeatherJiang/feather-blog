import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Page from '../views/Page';
import Article from '../views/Article';
import Tags from '../views/Tags';
import AboutMe from '../views/AboutMe';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page/:number" exact component={Page} />
      <Route path="/article/:id" exact component={Article} />
      <Route path="/types/:type" exact component={Page} />
      <Route path="/archive/:year/:month" component={Page} />
      <Route path="/tags" exact component={Tags} />
      <Route path="/tags/:tag" exact component={Page} />
      <Route path="/aboutme" exact component={AboutMe} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
