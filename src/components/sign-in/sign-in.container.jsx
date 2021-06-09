import { connect } from 'react-redux';

import SignInComponent from './sign-in.component';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

const SignInContainer = connect(
  null,
  mapDispatchToProps
)(SignInComponent);

export default SignInContainer;