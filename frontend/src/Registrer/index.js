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

const Register = () => {
    return (
        <StyledMainDiv>
            <StyledHeadlinePrimary>Register</StyledHeadlinePrimary>
            <StyledForm>
                <StyledFormRow>
                <StyledLabel>Email : </StyledLabel>
                <StyledInput width="405px" type="text" />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password : </StyledLabel>
                <StyledInput width="360px" type="password" />
                </StyledFormRow>
                <StyledFormRow>
                <StyledLabel>Password again : </StyledLabel>
                <StyledInput width="300px" type="password" />
                </StyledFormRow>
            </StyledForm>
        </StyledMainDiv>
    )
}

export default Register;