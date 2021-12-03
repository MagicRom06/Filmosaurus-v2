import styled from 'styled-components';

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

const Login = ({getToken}) => {
    return (
        <StyledContainer>
            <StyledHeadlinePrimary>login</StyledHeadlinePrimary>
                <StyledForm>
                    <StyledFormRow>
                        <StyledLabel>Email : </StyledLabel>
                        <StyledInput width='75%' type="text" name="email"/>
                    </StyledFormRow>
                    <StyledFormRow>
                        <StyledLabel>Password : </StyledLabel>
                        <StyledInput width='69%' type="text" name="password"/>
                    </StyledFormRow>
                    <StyledFormRow>
                    <StyledButton type="button">Login</StyledButton>
                    </StyledFormRow>
                </StyledForm>
        </StyledContainer>
    )
}

export default Login;