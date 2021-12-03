import styled from 'styled-components';

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

const LogOut = () => {
    return (
        <StyledContainer>
            <StyledHeadlinePrimary>Logout</StyledHeadlinePrimary>
            <StyledHeadlineSecondary>Are you sure you want to logout ?</StyledHeadlineSecondary>
            <StyledDivButton>
                <StyledButton>Confirm</StyledButton>
                <StyledButton>Cancel</StyledButton>
            </StyledDivButton>
        </StyledContainer>
    )
}

export default LogOut;