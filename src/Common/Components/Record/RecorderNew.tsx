
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
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    listAll,
    getDownloadURL,
    getMetadata,
    deleteObject,
    uploadBytesResumable,
} from "firebase/storage";



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

type FileType = {
    name: string,
    type: string,
    size: number,
    url: string | ArrayBuffer | null
    ref: null,
    blob: Blob,
    id: string,
    loaded: number | null
}

type FilesSavedType = {
    link: string,
    fileName: string,
    id: string
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const RecordView = () => {

    const [isAudio, setIsAudio] = useState(true)
    const [isVideo, setIsVideo] = useState(true)
    const [isScreen, setIsScreen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [link, setLink] = useState<FilesSavedType | undefined>()
    const [uploadedLinks, setUploadedLinks] = useState<FilesSavedType[]>([])
    const [percentage, setPercentage] = useState<number | undefined>()
    const [file, setFile] = useState<FileType>()



    // ------------------uploader-------------------

    const handleSaveRecording = async (mediaBlobUrl: string | undefined) => {
        if (!mediaBlobUrl) return null
        else {

            let blob = await fetch(mediaBlobUrl!)
                .then(r => r.blob());


            let fileReader = new FileReader();

            fileReader.readAsDataURL(blob);


            fileReader.onloadend = () => {
                const fileName = [...mediaBlobUrl.split("/")].reverse()[0]
                const ext = blob.type.slice(6)
                setFile(() => {
                    return {
                        name: `${fileName}.${ext}`,
                        type: blob.type,
                        size: blob.size,
                        url: fileReader.result,
                        ref: null,
                        blob,
                        id: uuidv4(),
                        loaded: null
                    }
                })


            }



        }
    }


    useEffect(() => {
        // console.log('file')
        // console.log(file)
        // console.log(file?.type)
        handleUpload()
    }, [file])


    const handleUpload = () => {

        if (file) {
            const path = (file.type === "audio/wav" ? "audio/" : "video/")
            const storageRef = ref(storage, path + file.name);

            const uploadTask = uploadBytesResumable(storageRef, file.blob, {
                customMetadata: {
                    'id': file.id
                }
            });
            console.log('stored to cloud')

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setPercentage(progress)
                },
                (error) => console.log(error),
                () => {

                    // Загрузка URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        if (uploadedLinks) {
                            console.log(uploadedLinks)
                        }

                        setLink({ link: downloadURL, fileName: file.name, id: file.id })

                    });
                }

            )
        }
    }


    useEffect(() => {

        if (!!link?.link) {

            setUploadedLinks([...uploadedLinks, link])
        }

    }, [link])





    const handelClearRec = (clearBlobUrl: () => void) => {
        clearBlobUrl()
        setLink(undefined)

    }




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


    // const upload = async () => {
    //     // setUploaded(true);
    //     if (mediaBlobUrl) {
    //         const fileName = [...mediaBlobUrl.split("/")].reverse()[0];
    //         const videoBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    //         const formData = new FormData();

    //         formData.append("file", videoBlob, `${fileName}.mp4`);

    //         fetch("https://root-grizzled-philodendron.glitch.me/upload", {
    //             method: "POST",
    //             mode: "cors",
    //             body: formData
    //         })
    //             .then((res) => res.json())
    //             .then((r) => {
    //                 setUploadURL(r.url);
    //             })
    //             .catch((e) => console.error(e));
    //     }
    // };




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
                        {link &&
                            <div>
                                <span>Файл доступен в облаке по ссылке: </span>

                                <a href={link.link}>{link.fileName}</a>
                            </div>
                        }

                        <ProgressBar percentage={percentage} />



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
                                        onClick={() => handelClearRec(clearBlobUrl)}
                                    >
                                        <Icon ><RefreshIcon sx={{ color: 'white' }} /></Icon>
                                        Новая запись
                                    </Button>

                                    <Button
                                        color='primary'
                                        variant='contained'
                                        style={{ width: "150px", height: "50px" }}
                                        onClick={() => handleSaveRecording(mediaBlobUrl!)}
                                    >
                                        <Icon ><RefreshIcon sx={{ color: 'white' }} /></Icon>
                                        Сохранить в облако
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



                        {uploadedLinks.length > 0 && (
                            <ListWrapperStyle>
                                Ранее загруженные файлы:
                                {uploadedLinks.map(file => {
                                    return <ListStyle key={file.id}>
                                        <li>
                                            <a href={file.link}>{file.fileName}</a>

                                        </li>

                                    </ListStyle>
                                }

                                )}
                            </ListWrapperStyle>

                        )}


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
const ListWrapperStyle = styled.div`
    margin-top: 10px;
    border: 1px solid ${colorsTheme.colors.dark[300]};
    border-radius: 2px;
    color: ${colorsTheme.colors.light[700]};
    padding: 5px 5px;
`

const ListStyle = styled.ul`
    margin-left: 25px;
    color: ${colorsTheme.colors.light[900]};

    & a {
        color: ${colorsTheme.colors.light[900]};
    }


`



