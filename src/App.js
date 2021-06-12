import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPageContainer from './pages/shop/shop.container';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPageContainer from './pages/checkout/checkout.container';
import HeaderContainer from './components/header/header.container';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser  } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]) // trigger effect only on componentDidMount, size checkUserSession never changes

  return (
    <div>
      {/* Apply all styles to the application */}
      <GlobalStyle />
      <HeaderContainer />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPageContainer} />
        <Route exact path='/checkout' component={CheckoutPageContainer} />
        {/* render is a JS invocation to determine what component to return */}
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
