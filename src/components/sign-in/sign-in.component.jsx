import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


import {
  SignInContainer,
  SignInTitle,
  ButtonsContainer
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }


  handleSubmit = async e => {
    e.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }


  render () {
    const { googleSignInStart } = this.props;
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            type='email' 
            name='email' 
            value={this.state.email} 
            label='email'
            required
            handleChange={this.handleChange}
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            label='password'
            required
            handleChange={this.handleChange}
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
    )
  }
}

export default SignIn;