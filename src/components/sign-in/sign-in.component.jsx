import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


import {
  SignInContainer,
  SignInTitle,
  ButtonsContainer
} from './sign-in.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const { email, password } = userCredentials;

  const handleSubmit = async e => {
    e.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = e => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput 
          type='email' 
          name='email' 
          value={email} 
          label='email'
          required
          handleChange={handleChange}
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          label='password'
          required
          handleChange={handleChange}
        />
        <ButtonsContainer>
          <CustomButton type='submit'>
            Sign in
          </CustomButton>
          <CustomButton
            type='button'
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            Sign in with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;