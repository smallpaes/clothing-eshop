import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HeaderContainer from './components/header/header.container';
import Spinner from './components/spinner/spinner.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser  } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// user lazy to wrap the component to lazy load in combination with route
// react router by default support code splitting
// webpack will chunk the code during build time
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPageContainer = lazy(() => import('./pages/shop/shop.container'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPageContainer = lazy(() => import('./pages/checkout/checkout.container'));

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
        {/* to wrap async component: lazy loading component */}
        {/* takes in a fallback run before component finished importing */}
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPageContainer} />
          <Route exact path='/checkout' component={CheckoutPageContainer} />
          {/* render is a JS invocation to determine what component to return */}
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Suspense>
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
