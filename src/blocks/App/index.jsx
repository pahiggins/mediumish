import React, { Component, Fragment } from 'react';

import Header from '../../blocks/Header';
import Nav from '../../blocks/Nav';
import Main from '../../elements/Main';
import Articles from '../../blocks/Articles';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Nav />
        <Main>
          <Articles />
        </Main>
      </Fragment>
    );
  }
}

export default App;
