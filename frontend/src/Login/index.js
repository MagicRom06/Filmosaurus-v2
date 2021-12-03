import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loader from "react-loader-spinner";
import checked from '../assets/images/checked.png';
import failed from '../assets/images/close.png';

const StyledContainer = styled.div `
position: relative;
`;

const StyledLoader = styled.div `
  text-align:center;
`;

const StyledModal = styled.div `
  background-color: transparent;
  z-index: 9;
  margin: 20px;
  height: 520px;
  text-align: center;

  span {
    margin: 0;
    width: 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    background-color: #171212;
    opacity: 0.3;
    padding: 10px;
  }
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

const StyledMainDiv = styled.div `
    margin: auto;
    width: 50%;
    text-align:center;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 25%;

    @media only screen and (max-width: 992px) {
      width: 100%;
      left: 0;
    }
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

    const cleanForm = () => {
        dispatchLogin({
          type: 'LOGIN_POST_NULL'
        })
        setEmail('')
        setPassword('')
      }
  
      const handleErrorModalClick = () => {
        cleanForm();
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
                        type: 'LOGIN_POST_FAILURE',
                        payload: e.response
                    })
                })
        }, 3000)
    }

    return (
        <StyledContainer>
            <StyledMainDiv>
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
                </StyledMainDiv>
                {login.isLoading && (
                    <Modal>
                        <StyledLoader>
                        <Loader
                            type="TailSpin"
                            color="white"
                            height={70}
                            width={70}
                            visible={true}
                        />
                        </StyledLoader> 
                    </Modal>
                )}
                {login.isSuccess && (
                    <Modal>
                        <img src={checked} width={70} height={70} />
                    </Modal>
                )}
                {login.isError && (
                    <Modal>
                        <img onClick={handleErrorModalClick} src={failed} width={70} height={70} />
                    </Modal>
                )}
        </StyledContainer>
    )
}

const Modal = ({children}) => {

    return (
      <>
      <StyledModal>
        <span>
        {children}
        </span>
      </StyledModal>
      </>
    )
  }

export default Login;