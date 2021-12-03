import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Loader from "react-loader-spinner";
import React from 'react';

const StyledContainer = styled.div `
    width: 50%;
    margin: auto;
    text-align: center;
`
const StyledHeadlinePrimary = styled.h1 `
    font-size: 35px;
    font-weight: 300;
    letter-spacing: 2px;
`;

const StyledHeadlineSecondary = styled.h1 `
font-size: 25px;
font-weight: 300;
letter-spacing: 2px;
`;

const StyledDivButton = styled.div `
    display: flex;
    justify-content:center;
`

const StyledButton = styled.button `
    background: transparent;
    border: 1px solid #171212;
    width: 100%;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    margin: 10px;
    &:hover {
      background: #171212;
      color: #ffffff;
      fill: #ffffff;
      stroke: #ffffff;
    }
`;

const StyledLoader = styled.div `
  text-align:center;
`;

const LogOut = ({removeCookie, setToken}) => {

    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleClickConfirm = () => {
        setLoading(true)
        setTimeout(() => {
            setToken(null)
            removeCookie('auth-token', {path: '/'})
            setLoading(false)
            navigate('/')
        }, 2000)
    }

    const handleClickCancel = () => {
        navigate('/');
    }

    return (
        <StyledContainer>
            <StyledHeadlinePrimary>Logout</StyledHeadlinePrimary>
            <StyledHeadlineSecondary>Are you sure you want to logout ?</StyledHeadlineSecondary>
            <StyledDivButton>
                
                {loading ? (
                <StyledButton>
                    <StyledLoader>
                        <Loader
                          type="TailSpin"
                          color="white"
                          height={30}
                          width={30}
                          visible={true}
                        />
                    </StyledLoader> 
                </StyledButton>
                ) : (<StyledButton onClick={handleClickConfirm}>Confirm</StyledButton>)}
                <StyledButton onClick={handleClickCancel}>Cancel</StyledButton>
            </StyledDivButton>
        </StyledContainer>
    )
}

export default LogOut;