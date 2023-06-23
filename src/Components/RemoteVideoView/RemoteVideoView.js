import { useEffect, useRef } from "react";

const RemoteVideoView = props =>{
    const { remoteStream } = props;
    const remoteVideoRef = useRef()

    useEffect(()=>{
        if(remoteStream){
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadedmetadata = ()=>{
                remoteVideo.play();
            }
        }
    },[remoteStream])

    return(
        <div>
            <video className="w-full h-full" ref={remoteVideoRef} autoPlay></video>
        </div>
    )
}

export default RemoteVideoView