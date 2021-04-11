import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null
  unsubscribeFromDocument = null

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // could be null when signing out
      if (userAuth) {
        // store the data to the database
        const userRef = await createUserProfileDocument(userAuth);
        
        // when code got executed, return a snapshot obj
        // representing the data currently stored in the db
        this.unsubscribeFromDocument = userRef.onSnapshot(snapShot => {
          // receive the user data just stored or already stored in the db
          this.setState({
            currentUser: {
              id: snapShot.id,
              // get actual properties on the obj
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
