
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ThemeButton } from '@/Common/Enum/themeButton';
import styled from "styled-components";
import { colorsTheme } from '@/styles/StyledComponents/Common/colors';
import VideoPreview from './VideoPreview'
import dynamic from "next/dynamic";

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
            let newvideo = base64data?.slice(0,5)
            
            handleUpload(newvideo!);

        }
    }

    const handleUpload = async (video: string | ArrayBuffer | null) => {
        
        console.log('upload video дата', JSON.stringify({ video }));
        try {
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: video }),
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
                            setLink(arr[0])
                            // setLink(arr[0].data)
                            

                        });
                })
                .catch((err) =>
                    console.log("err", err)
                )
        } catch (error) {
            console.error("catch error", error);
        }
    }




    return (
        <MediaWrapper>

            <ReactMediaRecorder
                video
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
                        <p>STATUS: {status}</p>
                        <p>link: {link}</p>

                        <VideoBlock>
                            {status === "recording" ? (
                                <VideoScreen>
                                    <VideoPreview stream={previewStream} />
                                </VideoScreen>

                            ) : (
                                <VideoScreen>
                                    <video src={mediaBlobUrl} height={500} width={500} autoPlay controls />
                                </VideoScreen>

                            )}
                        </VideoBlock>


                        <ButtonsBlock>
                            {(status === "idle" || status === "recorder_error") && (
                                <Button
                                    color='primary'
                                    style={{ width: "150px", height: "50px" }}
                                    variant='outlined'
                                    onClick={startRecording}>Начать запись</Button>
                            )}


                            {(status === "recording" || status === "paused") && (
                                <>

                                    <Button color='primary' variant='outlined' style={{ width: "150px", height: "50px" }} onClick={stopRecording}>Остановить запись</Button>

                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ width: "150px" }}
                                        onClick={() => status === "paused" ? resumeRecording() : pauseRecording()}
                                    >
                                        {status === "paused" ? "Продолжить запись" : "Пауза"}
                                    </Button>
                                </>
                            )}

                            {status === "stopped" && (
                                <>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={clearBlobUrl}
                                    >
                                        Очистить запись
                                    </Button>

                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => handleSaveRecording(mediaBlobUrl)}
                                    >
                                        Сохранить запись
                                    </Button>
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
    width: 500px;
    height: 400px;
`

const VideoScreen = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${colorsTheme.colors.accent[100]};  
    border-radius: 2px;
    /* height: 500px; */
  `

const ButtonsBlock = styled.div`
    margin-top: 10px;
  `




