import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import styled from 'styled-components'

// import Header from '../Header/Header'
import { colorsTheme } from './../../../styles/StyledComponents/Common/colors';

export const Layout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  return (
    <StyledWrapper>
      {/* <Header /> */}
      <Main>{children}</Main>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: ${colorsTheme.colors.dark['700']}; */
  color: ${colorsTheme.colors.light[100]};
`

const Main = styled.div`
display: flex;
/* justify-content: center;
align-items: center; */
margin-top:100px;
`
