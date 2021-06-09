import { connect } from 'react-redux';

import SignUp from './sign-up.component';

import { signUpStart } from '../../redux/user/user.actions';

const mapDispatchToProps = dispatch => ({
  signUpStart: userInfo => dispatch(signUpStart(userInfo))
});

const SignUpContainer = connect(null, mapDispatchToProps)(SignUp);

export default SignUpContainer;