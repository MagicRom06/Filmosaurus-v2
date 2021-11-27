import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledNavBar = styled.div `
    padding: 20px;
    color: #171212;
`;

const StyledHeadlinePrimary = styled.h1 `
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 2px;
    float: left;

    @media only screen and (max-width: 992px) {
        float: none;
        text-align: center;
    }
`;

const StyledList = styled.ul `
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: inherit;
`;

const StyledLi = styled.li `
    float: right;
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 18px;

    @media only screen and (max-width: 992px) {
        float: none;
    }
`;

const StyledA = styled.a `
    color: #171212;
`;

const Header = ({isAthenticated}) => (
    <>
    {isAthenticated ? (
    <StyledNavBar>
        <StyledList>
            <StyledA href="/"><StyledHeadlinePrimary>Filmosaurus</StyledHeadlinePrimary></StyledA>
            <StyledLi>Logout</StyledLi>
            <StyledLi><Link to="#">Account</Link></StyledLi>
        </StyledList>
    </StyledNavBar>
    ) : (
    <StyledNavBar>
        <StyledList>
            <StyledA href="/"><StyledHeadlinePrimary>Filmosaurus</StyledHeadlinePrimary></StyledA>
            <StyledLi><Link to="accounts/register">Sign up</Link></StyledLi>
            <StyledLi>Login</StyledLi>
        </StyledList>
    </StyledNavBar>
    )}

    </>
)

export default Header;