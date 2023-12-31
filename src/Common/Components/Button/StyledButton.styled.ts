import styled from 'styled-components'

import { StyledButtonPropsType } from './types'

export const StyledButton = styled.button.attrs(props => ({
  type: props.type ? props.type : 'button',
}))<StyledButtonPropsType>`
    height: 36px;
    width: ${props => (props.width ? props.width : '330px')};
    padding: 0 20px;


    font-family: Arial;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    border: none;
    border-radius: 2px;
    cursor: pointer;
    
    

    ${props => (props.theme ? props.handler : '')};

    @media (max-width: 390px) {
      width: ${props => (props.width ? props.width : '80vw')};
    }
  `
