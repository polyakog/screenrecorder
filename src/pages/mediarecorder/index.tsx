
import RecorderNew from "@/Common/Components/Record/RecorderNew";

import { colorsTheme } from "@/styles/StyledComponents/Common/colors";
import { styled } from 'styled-components';
import { getLayout } from '@/Common/Components/Layout/BaseLayout/BaseLayout';
import RecordView from "@/Common/Components/Record/RecorderNew";


const MediaRecorder = () => {

    return (
        <RecorderWrapper>
            <Title> Video recorder - 2  </Title>

          <RecordView/>

        </RecorderWrapper>

    )

}

MediaRecorder.getLayout = getLayout
export default MediaRecorder

const RecorderWrapper = styled.div`
    
    width: 400px;
    height: auto;
    /* background: ${colorsTheme.colors.dark[500]}; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Title = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 15px;
    padding-top: 10px;
`


