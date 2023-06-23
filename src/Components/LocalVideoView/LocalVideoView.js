import { useEffect, useRef } from "react";

const LocalVideoView = props =>{
    const { localStream } = props;
    const localVideoRef = useRef()
    console.log(localStream)

    useEffect(()=>{
        if(localStream){
            console.log(localStream)
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadedmetadata = ()=>{
                localVideo.play();
            }
        }
    },[localStream])

    return(
        <div className="h-[200px] w-[200px] mx-20">
            <video className="w-full h-full" ref={localVideoRef} autoPlay muted></video>
        </div>
    )
}

export default LocalVideoView