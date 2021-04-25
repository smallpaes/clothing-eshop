import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null
  unsubscribeFromDocument = null

  componentDidMount () {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // could be null when signing out
      if (userAuth) {
        // store the data to the database
        const userRef = await createUserProfileDocument(userAuth);
        
        // when code got executed, return a snapshot obj
        // representing the data currently stored in the db
        this.unsubscribeFromDocument = userRef.onSnapshot(snapShot => {
          // receive the user data just stored or already stored in the db
          setCurrentUser({
            id: snapShot.id,
            // get actual properties on the obj
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
    this.unsubscribeFromDocument();
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
