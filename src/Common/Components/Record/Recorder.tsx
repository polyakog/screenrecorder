
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";



const Recorder2 = () => {
    const videoRef: any = useRef();
    const [link, setLink] = useState();
    let arr: any = []

    const {

        mediaBlobUrl,

        pauseRecording,

        clearBlobUrl,

        resumeRecording,

        startRecording,

        status,

        stopRecording,

    } = useReactMediaRecorder({ video: true, audio: true });


    const handleVideo = async () => {

        let blob = await fetch(mediaBlobUrl!)
            .then(r => r.blob());
            debugger

        var reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onloadend = function () {

            var base64data = reader.result;

            handleUpload(base64data);

        }
    }

    async function handleUpload(video: any) {
        console.log('upload video', video);
        try {
            fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: video }),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    console.log("response", response.status)
                    response.json()
                        .then((data) => {
                            arr.push(data)
                            setLink(arr[0].data)
                            
                        });
                })
                .catch( (err) =>
                    console.log("err", err)
                )
        } catch (error) {
            console.error("catch error", error);
        }
    }

    
    return (
        <div>

            <div className='status'>
                Статус: {status}
                <br /><br />
                Видео ссылка: {link || "нет сссылки..."}
            </div>
            <div>
                <video
                    ref={videoRef}
                    src={mediaBlobUrl}
                    controls
                    autoPlay
                    loop
                />
            </div>
            <div className='buttons'>
                {(status === "idle" || status === "recorder_error") && (
                    <Button onClick={startRecording} variant='contained' color='primary' >Начать запись</Button>
                )}

                {(status === "recording" || status === "paused") && (
                    <>

                        <Button color='secondary' variant='contained' onClick={stopRecording}>Остановить запись</Button>
                        {'    '}
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => status === "paused" ? resumeRecording() : pauseRecording()}
                        >
                            {status === "paused" ? "Продолжить запись" : "Пауза"}
                        </Button>
                    </>

                )}


                {status === "stopped" && (
                    <Button
                        onClick={() => {
                            resumeRecording();
                            videoRef.current.load();
                        }}
                        variant='contained' color='primary'
                    >
                        Resume recording
                    </Button>

                )}{' '}

                {status === "stopped" && (
                    <Button
                        onClick={handleVideo}
                        variant='contained'
                        color='primary'
                    >
                        Upload Recording/ handleVideo
                    </Button>

                )} {' '}

                <Button
                    onClick={clearBlobUrl}
                    variant='outlined'
                    color='primary'
                >
                    Сбросить видео
                </Button>

            </div>
        </div>
    )

}

export default Recorder2
