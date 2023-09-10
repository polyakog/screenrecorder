import { Button } from "@/Common/Components/Button/Button"
import { getLayout } from "@/Common/Components/Layout/BaseLayout/BaseLayout";
import Recorder2 from "@/Common/Components/Record/Recorder";
import { ThemeButton } from "@/Common/Enum/themeButton"
import { colorsTheme } from "@/styles/StyledComponents/Common/colors";
import { useState } from "react";
import { styled } from 'styled-components';



 var blob, mediaRecorder = null
    var chunks: any = []


const Recorder = () => {

   return (
        <RecorderWrapper>
            <Title> Screen recorder  </Title>

            <Recorder2/>
          
        </RecorderWrapper>

    )

}

Recorder.getLayout = getLayout
export default Recorder

const RecorderWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    /* background: ${colorsTheme.colors.dark[300]} */
`

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
`


