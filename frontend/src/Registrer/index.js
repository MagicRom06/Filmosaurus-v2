import React from 'react';
import styled from 'styled-components';

const StyledMainDiv = styled.div `
    margin: auto;
    width: 50%;
    text-align:center;
    display: flex;
    flex-direction: column;
`;

const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledFormRow = styled.div `
    display: flex;
    padding: 20px;
`;

const StyledLabel = styled.label `
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input `
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
  &:focus {
    outline: none;
  }

  width: ${props => props.width};
`;

const StyledHeadlinePrimary = styled.h1 `
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
`;

const StyledButton = styled.button `
  background: transparent;
  border: 1px solid #171212;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    background: #171212;
    color: #ffffff;
    fill: #ffffff;
    stroke: #ffffff;
  }
`;

const Register = () => {

    const [email, setEmail] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const handleEmailChange = e => {
      setEmail(e.target.value);
    };

    const handlePassword1Change = e => {
      setPassword1(e.target.value);
    };

    const handlePassword2Change = e => {
      setPassword2(e.target.value);
    };

    const handleSubmit = e => {
      const data = {
        'email' : e.target.email.value,
        'password1' : e.target.password1.value,
        'password2' : e.target.password2.value
      }
      e.preventDefault();
    }

    return (
        <StyledMainDiv>
            <StyledHeadlinePrimary>Register</StyledHeadlinePrimary>
            <StyledForm onSubmit={handleSubmit}>
                <StyledFormRow>
                <StyledLabel>Email : </StyledLabel>
                <StyledInput
                  width="81%"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password : </StyledLabel>
                <StyledInput
                  width="75%"
                  type="password"
                  name="password1"
                  value={password1}
                  onChange={handlePassword1Change}
                />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password again : </StyledLabel>
                <StyledInput
                  width="66%"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={handlePassword2Change}
                />
                </StyledFormRow>
                <StyledFormRow>
                    <StyledButton type="submit">Register</StyledButton>
                </StyledFormRow>
            </StyledForm>
        </StyledMainDiv>
    )
}

export default Register;