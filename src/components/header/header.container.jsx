// connect is a HOC letting us modify the component to have access to Redux
import { connect } from 'react-redux';
import { compose } from 'redux';

import Header from './header.component';

import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

// function allowing us to access the state(root reducer)
// createStructuredSelector auto pass the state into each subsequent selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

const HeaderContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Header);

export default HeaderContainer;