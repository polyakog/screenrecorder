import { Button } from "@/Common/Components/Button/Button"
import { getLayout } from "@/Common/Components/Layout/BaseLayout/BaseLayout";
import { ThemeButton } from "@/Common/Enum/themeButton"
import { colorsTheme } from "@/styles/StyledComponents/Common/colors";
import { useState } from "react";
import { styled } from 'styled-components';



 var blob, mediaRecorder = null
    var chunks: any = []


const Recorder = () => {

   
    let deviceRecorder: any

    async function startRecording(){
        var stream =  await navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
    
        deviceRecorder = new deviceRecorder(stream, {mimeType: "video/webm"});
        deviceRecorder.ondataavailable = (e: any) => {
            if(e.data.size > 0){
                 chunks.push(e.data);
                 console.log(e.data)
            }
        }
        deviceRecorder.onstop = () => {
            chunks = [];
        }
        deviceRecorder.start(250)
    }
    console.log(deviceRecorder)
    // console.log(deviceRecorder.isTypeSupported("video/webm"))
    // console.log(deviceRecorder.isTypeSupported("video/mp4"))
    // console.log(deviceRecorder.isTypeSupported("video/mp4;codecs=avc1"))


    function stopRecording() {
        var filename = window.prompt("File name", "video"); // Ask the file name

        deviceRecorder.stop(); // Stopping the recording
        blob = new Blob(chunks, { type: "video/webm" })
        chunks = [] // Resetting the data chunks
        var dataDownloadUrl = URL.createObjectURL(blob);

        // Downloadin it onto the user's device
        let a = document.createElement('a')
        a.href = dataDownloadUrl;
        a.download = `${filename}.webm`
        a.click()

        URL.revokeObjectURL(dataDownloadUrl)
    }
    const [butonText, setButonText] = useState('Start recording')
    let RECORDING_ONGOING = false;
    const handler = () => {

        RECORDING_ONGOING = !RECORDING_ONGOING; // Start / Stop recording
        if (RECORDING_ONGOING) {
            setButonText("Stop Recording")
            startRecording(); // Start the recording
        } else {
            setButonText("Start Recording")
            stopRecording(); // Stop screen recording
        }
    }

    return (
        <RecorderWrapper>
            <Title>
                Screen recorder
            </Title>
            <Button
                theme={ThemeButton.PRIMARY}
                type="button"
                onClick={handler}
            >
                {butonText}
            </Button>
        </RecorderWrapper>

    )

}

Recorder.getLayout = getLayout
export default Recorder

const Title = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
`

const RecorderWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 200px;
    background: ${colorsTheme.colors.dark[300]}


`

