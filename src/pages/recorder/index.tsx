import { Button } from "@/Common/Components/Button/Button"
import { getLayout } from "@/Common/Components/Layout/BaseLayout/BaseLayout";
import { ThemeButton } from "@/Common/Enum/themeButton"
import { colorsTheme } from "@/styles/StyledComponents/Common/colors";
import { styled } from 'styled-components';

const Recorder = () => {

    return (
        <RecorderWrapper>
            <Button theme={ThemeButton.PRIMARY} type="button">Start recording</Button>
        </RecorderWrapper>

    )

}

Recorder.getLayout = getLayout
export default Recorder

const RecorderWrapper = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 500px;
    background: ${colorsTheme.colors.dark[300]}

`

