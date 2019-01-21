import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../../blocks/Header';
import MainNav from '../../blocks/MainNav';
import Main from '../../elements/Main';
import Articles from '../Articles';
import ArticleDetails from '../ArticleDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <MainNav />
          <Main>
            <Route exact path="/" component={Articles} />
            <Route exact path="/topic/:slug" component={Articles} />
            <Route path="/:username/:article_id" component={ArticleDetails} />
            {/* <Route path="/topics/" component={} /> */}
            {/* <Route path="/:topic/articles" component={Articles} /> */}
          </Main>
        </Fragment>
      </Router>
    );
  }
}

export default App;
