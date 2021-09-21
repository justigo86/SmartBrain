import React from 'react';
import Tilt from 'react-tilt'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBrain} from '@fortawesome/free-solid-svg-icons';

const TiltContainer = styled.div `
    & > .Tilt {
        background: rgb(2, 134, 155);
    }
    `
const LogoContainer = styled.div `
    & > .brain {
        height: 150px;
        width: 130px;
        color: rgba(255, 122, 223, 1);
        background-image: linear-gradient(90deg, rgba(0,255,155,.07) 50%, transparent 50%),
        linear-gradient(90deg, rgba(0,255,155,.13) 50%, transparent 50%),
        linear-gradient(90deg, transparent 50%, rgba(0,255,155,.17) 50%),
        linear-gradient(90deg, transparent 50%, rgba(0,255,155,.19) 50%);
        background-size: 13px, 29px, 37px, 53px;
    }
`

const Logo = () => {
    return (
        <TiltContainer className="ma4 mt0">
            <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
                <LogoContainer className="Tilt-inner">
                    <FontAwesomeIcon className="brain" icon={faBrain}/>
                </LogoContainer>
            </Tilt>
        </TiltContainer>
    )
}

export default Logo
