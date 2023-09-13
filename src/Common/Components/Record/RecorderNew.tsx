
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ThemeButton } from '@/Common/Enum/themeButton';
import styled from "styled-components";
import { colorsTheme } from '@/styles/StyledComponents/Common/colors';
import VideoPreview from './VideoPreview'
import dynamic from "next/dynamic";
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import MicTwoToneIcon from '@mui/icons-material/MicTwoTone';
import MicOffTwoToneIcon from '@mui/icons-material/MicOffTwoTone';
import Icon from '@mui/material/Icon';
import { green, red, grey } from '@mui/material/colors';


const ReactMediaRecorder = dynamic(() => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder), {
    ssr: false,
});



type PropsType = {
    isMuted: boolean,
    clearBlobUrl: () => void,
    mediaBlobUrl: string,
    muteAudio: () => void,
    pauseRecording: () => void,
    resumeRecording: () => void,
    startRecording: () => void,
    status: string,
    stopRecording: () => void,
    stream: MediaStream | null
    unmuteAudio: () => void,
}

const RecordView = () => {

    const [link, setLink] = useState();
    let arr: any[] = []

    const handleSaveRecording = async (mediaBlobUrl: string | undefined) => {

        let blob = await fetch(mediaBlobUrl!)
            .then(r => r.blob());


        let reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onloadend = function () {

            let base64data = reader.result;
            let newvideo = base64data?.slice(5)

            handleUpload(newvideo!);

        }
    }

    const handleUpload = async (newvideo: string | ArrayBuffer | null) => {

        console.log('upload video req body', JSON.stringify({ data: newvideo }));
        console.log(JSON.stringify({ data: newvideo }));
        try {
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: newvideo }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })
                .then((response) => {
                    console.log("response ПРИШЕЛ", response)
                    response.json()
                        .then((data) => {
                            console.log("data from response:", data)
                            arr.push(data)
                            setLink(arr[0].data)


                        });
                })
                .catch((err) =>
                    console.log("err", err)
                )
        } catch (error) {
            console.error("catch error", error);
        }
    }

    const [isAudio, setIsAudio] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)

    const handleMute = () => {
        isAudio ? setIsAudio(false) : setIsAudio(true)
    }

    return (
        <MediaWrapper>

            <ReactMediaRecorder
                video
                audio={isAudio}

                render={({
                    clearBlobUrl,
                    isAudioMuted,
                    muteAudio,
                    pauseRecording,
                    resumeRecording,
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                    previewStream,
                    unMuteAudio
                }) => (
                    <div>
                        {/* <p>STATUS: {status}</p> */}


                        <VideoBlock>

                            {status === "recording" ? (
                                <>
                                    <RecordingStyle>
                                        Запись
                                        <Icon ><RadioButtonCheckedRoundedIcon sx={{ color: red[800], position: "absolute", top: "5px" }} /></Icon>
                                    </RecordingStyle>

                                    <VideoScreen>
                                        <VideoPreview stream={previewStream} />
                                    </VideoScreen>
                                </>


                            ) : (
                                <>
                                    <VideoScreen>
                                        <video src={mediaBlobUrl} height={400} width={500} autoPlay controls />
                                    </VideoScreen>
                                </>


                            )}
                        </VideoBlock>


                        <ButtonsBlock>

                            <Button
                                color='info'
                                disabled={isDisabled}
                                style={{ width: "150px", height: "50px" }}
                                variant='contained'
                                onClick={handleMute}>
                                {isAudio
                                    ? <Icon ><MicOffTwoToneIcon sx={{ color: (isDisabled ?  grey[600] : red[100]) }} /></Icon>
                                    : <Icon ><MicTwoToneIcon sx={{  color: (isDisabled ?  grey[600] : green[200]) }} /></Icon>
                                }
                            </Button>

                            {(status === "idle" || status === "recorder_error") && (
                               <>
                               {setIsDisabled(false)}
                                <Button
                                    color='info'
                                    style={{ width: "150px", height: "50px" }}
                                    variant='contained'
                                    onClick={startRecording}>
                                    Начать запись
                                </Button>
                               </>
                              
                            )}


                            {(status === "recording" || status === "paused") && (
                                <>
                                    {setIsDisabled(true)}
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={stopRecording}>
                                        Остановить запись
                                    </Button>

                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => status === "paused" ? resumeRecording() : pauseRecording()}
                                    >
                                        {status === "paused" ? "Продолжить запись" : "Пауза"}
                                    </Button>
                                </>
                            )}

                            {status === "stopped" && (
                                <>
{setIsDisabled(false)}
                                    <ViewStyle>
                                        Записано
                                        <Icon ><RadioButtonCheckedRoundedIcon sx={{ color: green[800], position: "absolute", top: "5px" }} /></Icon>
                                    </ViewStyle>

                                    <Button
                                        color='secondary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={clearBlobUrl}
                                    >
                                        Очистить запись
                                    </Button>

                                    {/* <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => handleSaveRecording(mediaBlobUrl)}
                                    >
                                        Сохранить запись
                                    </Button> */}
                                </>


                            )}


                        </ButtonsBlock>


                    </div>
                )}
            />

        </MediaWrapper>
    )
}

export default RecordView

const MediaWrapper = styled.div`
    /* border: 1px solid ${colorsTheme.colors.accent[100]};    */

  `
const VideoBlock = styled.div`
    width: 505px;
    height: 405px;
`


const VideoScreen = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap:wrap;

    width: 100%;
    height: 100%;
    border: 1px solid ${colorsTheme.colors.accent[100]};  
    border-radius: 2px;
    
    /* height: 500px; */
  `

const ButtonsBlock = styled.div`
    margin-top: 10px;
    display: inline-flex;  
    gap: 5px;

  `

const RecordingStyle = styled.div`
    z-index: 5;
    position:absolute;
    top: 85px;
    right: 25%;
    color: ${red[800]};
    text-align: center;

`

const ViewStyle = styled(RecordingStyle)`
    color: ${green[800]};
`



