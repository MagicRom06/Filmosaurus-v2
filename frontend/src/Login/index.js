import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';

const StyledContainer = styled.div `
    margin: auto;
    width: 50%;
    text-align: center;
`;

const StyledHeadlinePrimary = styled.h1 `
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
`;

const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    padding: 70px 0;
    text-align: center;
    padding: 10px 0 20px 0;
    margin-top: 50px;
`;

const StyledLabel = styled.label `
  padding-left: 5px;
  font-size: 24px;

  @media only screen and (max-width: 992px) {
    font-size: 15px;
  }
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

const StyledFormRow = styled.div `
    display: flex;
    padding: 20px;
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
const endpoint = 'http://127.0.0.1:8000/api/v1/dj-rest-auth/login/'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_POST_NULL':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false
      }
    case 'LOGIN_POST_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false
      };
    case 'LOGIN_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.key,
        isSuccess: true
      };
    case 'LOGIN_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false
      };
    default:
      return state
  }
}

const Login = ({getToken}) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [login, dispatchLogin] = React.useReducer(
        loginReducer,
        {data: null, isError: false, isLoading: false, isSuccess: false}
      )

    const handleSubmit = e => {
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value
        }
        console.log(data)
        handlePostLogin(data)
        e.preventDefault();
    }

    const handlePostLogin = data => {
        dispatchLogin({type: 'LOGIN_POST_INIT'})
        setTimeout(() => {
            axios.post(endpoint, data)
                .then(res => {
                    dispatchLogin({
                        type: 'LOGIN_POST_SUCCESS',
                        payload: res.data
                    });
                    getToken(res.data.key);
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                })
                .catch(e => {
                    dispatchLogin({
                        type: 'REGISTER_POST_FAILURE',
                        payload: e.response
                    })
                })
        }, 3000)
    }

    return (
        <StyledContainer>
            <StyledHeadlinePrimary>login</StyledHeadlinePrimary>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledFormRow>
                        <StyledLabel>Email : </StyledLabel>
                        <StyledInput
                            width='75%'
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </StyledFormRow>
                    <StyledFormRow>
                        <StyledLabel>Password : </StyledLabel>
                        <StyledInput
                            width='69%'
                            type="text"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </StyledFormRow>
                    <StyledFormRow>
                    <StyledButton type="submit">Login</StyledButton>
                    </StyledFormRow>
                </StyledForm>
        </StyledContainer>
    )
}

export default Login;