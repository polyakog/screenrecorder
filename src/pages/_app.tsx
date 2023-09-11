import { ReactElement, ReactNode } from 'react'

import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

import '../styles/nprogress.css'
// import { useLoader } from '@/Common/hooks/useLoader'
import { colorsTheme } from './../styles/StyledComponents/Common/colors';


export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      {getLayout(
        <>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      )}
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  *{
     
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: ${colorsTheme.colors.light[100]};

  }

  html{
    height:100vh;
    background: ${colorsTheme.colors.dark[900]};

    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    /* &::-webkit-scrollbar {
  width: 10px;
  }
  &::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
} */

/* &::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 10px;
  background-color: black;
} */
  }
`
