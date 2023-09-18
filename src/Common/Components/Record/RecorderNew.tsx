
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
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CameraIcon from '@mui/icons-material/Camera';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import ScreenShareTwoToneIcon from '@mui/icons-material/ScreenShareTwoTone';
import StopScreenShareTwoToneIcon from '@mui/icons-material/StopScreenShareTwoTone';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import RefreshIcon from '@mui/icons-material/Refresh';

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
    const [isVideo, setIsVideo] = useState(true)
    const [isScreen, setIsScreen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [mediaBlobUrl, setMediaBlobUrl] = useState('')
    const [uploadURL, setUploadURL] = useState("");

    const handleMute = () => {
        isAudio ? setIsAudio(false) : setIsAudio(true)
    }

    const handleVideoOff = () => {
        if (isVideo) {
            setIsVideo(false)
            setIsScreen(false)
        } else {
            setIsVideo(true)

        }
    }

    const handleScreenOff = () => {
        if (isScreen) {
            setIsScreen(false)
        } else {
            setIsScreen(true)
            setIsVideo(true)
        }
    }

    useEffect(() => {
        if (mediaBlobUrl) console.log(mediaBlobUrl)
    }, [mediaBlobUrl])

    const upload = async () => {
        // setUploaded(true);
        if (mediaBlobUrl) {
            const fileName = [...mediaBlobUrl.split("/")].reverse()[0];
            const videoBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
            const formData = new FormData();

            formData.append("file", videoBlob, `${fileName}.mp4`);

            fetch("https://root-grizzled-philodendron.glitch.me/upload", {
                method: "POST",
                mode: "cors",
                body: formData
            })
                .then((res) => res.json())
                .then((r) => {
                    setUploadURL(r.url);
                })
                .catch((e) => console.error(e));
        }
    };


    const handeleSave = async (neWMediaBlobUrl: string) => {
        setMediaBlobUrl(neWMediaBlobUrl)


        const Blob = await fetch(neWMediaBlobUrl).then((r) => r.blob());
        let fileExt = ''
        let type = ''
        if (isVideo || isScreen) {
            fileExt = 'mp4'
            type = 'video/mp4'
        } else {
            fileExt = 'wav'
            type = 'audio/wav'
        }

        const fileName = `${[...mediaBlobUrl.split("/")].reverse()[0]}.${fileExt}`
        // const mediaFile = new File([Blob], fileName, { type: type });
        const formData = new FormData(); // preparing to send to the server

        formData.append('file', Blob, fileName);  // preparing to send to the server

        onSaveMedia(formData); // sending to the server        

    }

    const onSaveMedia = (formData: FormData) => {
        // fetch("https://root-grizzled-philodendron.glitch.me/upload", {
        fetch("/api/upload", {
            method: "POST",
            mode: "cors",
            body: formData
        })
            .then((res) => res.json())
            .then((r) => {
                setUploadURL(r.url);
            })
            .catch((e) => console.error(e));

    }







    return (
        <MediaWrapper>

            <ReactMediaRecorder
                video={isVideo}
                audio={isAudio}
                screen={isScreen}

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
                        URL:{uploadURL}

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
                                color={isAudio ? 'secondary' : 'info'}
                                disabled={isDisabled}
                                style={{ width: "50px", height: "50px" }}
                                variant='contained'
                                onClick={handleMute}>
                                {isAudio
                                    ? <Icon ><MicOffTwoToneIcon sx={{ color: (isDisabled ? grey[600] : red[100]) }} /></Icon>
                                    : <Icon ><MicTwoToneIcon sx={{ color: (isDisabled ? grey[600] : green[200]) }} /></Icon>
                                }
                            </Button>

                            <Button
                                color={isVideo ? 'secondary' : 'info'}
                                disabled={isDisabled}
                                style={{ width: "50px", height: "50px" }}
                                variant='contained'
                                onClick={handleVideoOff}>
                                {isVideo
                                    ? <Icon ><VideocamOffIcon sx={{ color: (isDisabled ? grey[600] : red[100]) }} /></Icon>
                                    : <Icon ><VideocamIcon sx={{ color: (isDisabled ? grey[600] : green[200]) }} /></Icon>
                                }
                            </Button>

                            <Button
                                color={isScreen ? 'secondary' : 'info'}
                                disabled={isDisabled}
                                style={{ width: "50px", height: "50px" }}
                                variant='contained'
                                onClick={handleScreenOff}>
                                {isScreen
                                    ? <Icon ><StopScreenShareTwoToneIcon sx={{ color: (isDisabled ? grey[600] : red[100]) }} /></Icon>
                                    : <Icon ><ScreenShareTwoToneIcon sx={{ color: (isDisabled ? grey[600] : green[200]) }} /></Icon>
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

                                        <Icon ><CameraIcon sx={{ color: 'white' }} /></Icon>

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

                                        <Icon ><StopCircleIcon sx={{ color: 'white' }} /></Icon>
                                        Остановить запись
                                    </Button>

                                    <Button
                                        color={(isVideo || isScreen) ? 'secondary' : 'primary'}
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => status === "paused" ? resumeRecording() : pauseRecording()}
                                    >

                                        {status === "paused"
                                            ? <>
                                                <Icon ><RadioButtonCheckedRoundedIcon sx={{ color: 'white' }} /></Icon>

                                                Продолжить запись
                                            </>
                                            : (<>
                                                <Icon ><PauseCircleFilledIcon sx={{ color: 'white' }} /></Icon>
                                                {' Пауза'}
                                            </>

                                            )
                                        }
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
                                        color='primary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={clearBlobUrl}
                                    >
                                        <Icon ><RefreshIcon sx={{ color: 'white' }} /></Icon>
                                        Новая запись
                                    </Button>

                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => handeleSave(mediaBlobUrl!)}
                                    >
                                        <Icon ><RefreshIcon sx={{ color: 'white' }} /></Icon>
                                        Сохранить
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



