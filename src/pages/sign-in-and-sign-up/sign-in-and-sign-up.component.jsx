import React from 'react';
import SignInContainer from '../../components/sign-in/sign-in.container';
import SignUpContainer from '../../components/sign-up/sign-up.container';

import { SignInAndSignUpPageContainer } from './sign-in-and-sign-up.component.styles';

const SignInAndSignUpPage = () => (
  <SignInAndSignUpPageContainer>
    <SignInContainer />
    <SignUpContainer />
  </SignInAndSignUpPageContainer>
);

export default SignInAndSignUpPage;