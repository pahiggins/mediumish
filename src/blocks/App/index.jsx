import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../../blocks/Header';
import MainNav from '../../blocks/MainNav';
import Main from '../../elements/Main';
import Articles from '../Articles';
import Article from '../Article';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <MainNav />
          <Main>
            <Route exact path="/" component={Articles} />
            <Route exact path="/articles" component={Articles} />
            <Route path="/articles/:article_id" component={Article} />
            {/* <Route path="/topics/" component={} /> */}
            {/* <Route path="/:topic/articles" component={Articles} /> */}
          </Main>
        </Fragment>
      </Router>
    );
  }
}

export default App;
