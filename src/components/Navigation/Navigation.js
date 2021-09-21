import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav `
    display: flex;
    justify-content: flex-end;
`

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <Nav>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </Nav>
        )
    } else {
        return (
            <Nav>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
            </Nav>
        )
    } 
}

export default Navigation
