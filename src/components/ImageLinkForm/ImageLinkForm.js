import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div `
    display: flex;
    justify-content: center;
    width: 700px;
    background-color: rgb(2, 134, 155);
    background-image: linear-gradient(90deg, rgba(0,255,155,.07) 50%, transparent 50%),
    linear-gradient(90deg, rgba(0,255,155,.13) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(0,255,155,.17) 50%),
    linear-gradient(90deg, transparent 50%, rgba(0,255,155,.19) 50%);
    background-size: 13px, 29px, 37px, 53px;
    & > button {
        cursor: pointer;
        background-color: rgba(255, 122, 223, 1);
    }
`

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <InputContainer className='pa4 br3 shadow-5 center'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange} />
                <button className='w-30 grow f4 link ph3 pv2 dib white' onClick={onButtonSubmit}>
                    Detect
                </button>
            </InputContainer>
        </div>
    )
}

export default ImageLinkForm
