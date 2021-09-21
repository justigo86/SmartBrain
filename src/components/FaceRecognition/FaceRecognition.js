import React from 'react';
import styled from 'styled-components';

const Image = styled.div `
    display: flex;
    justify-content: center;
`
const FaceBox = styled.div`
    position: absolute;
    box-shadow: 0 0 0 3px #149df2 inset;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
`

const FaceRecognition = ({ box, imgURL }) => {
    return (
        <Image className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' alt='' src={imgURL} width='500px' height='auto' />
                <FaceBox style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></FaceBox>
            </div>
        </Image>
    );
}

export default FaceRecognition;