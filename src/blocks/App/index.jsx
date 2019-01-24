import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContext from './AuthContext';

import Header from '../../blocks/Header';
import MainNav from '../../blocks/MainNav';
import Main from '../../elements/Main';
import Articles from '../Articles';
import SignIn from '../SignIn';
import ArticleAdd from '../ArticleAdd';
import ArticleDetails from '../ArticleDetails';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleStatus = () => {
      this.setState(state => ({
        status: state.status === 'signedOut' ? 'signedIn' : 'signedOut',
      }));
    };

    this.state = {
      status: 'signedOut',
      toggleStatus: this.toggleStatus,
    };
  }

  render() {
    return (
      <Router>
        <Fragment>
          <AuthContext.Provider value={this.state}>
            <Header />
            <MainNav />
            <Main>
              <Switch>
                <Route exact path="/" component={Articles} />
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/new-article" component={ArticleAdd} />
                <Route exact path="/topic/:slug" component={Articles} />
                <Route
                  path="/:username/:articleId"
                  component={ArticleDetails}
                />
              </Switch>
            </Main>
          </AuthContext.Provider>
        </Fragment>
      </Router>
    );
  }

  // toggleStatus = () => {
  //   console.log('Here also');
  //   this.setState(state => ({
  //     status: state.status === 'signedOut' ? 'signedIn' : 'signedOut',
  //   }));
  // };
}

export default App;
