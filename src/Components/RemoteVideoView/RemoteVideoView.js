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
        <div className="w-screen pl-[300px] pr-[300px] pt-10">
            <video className="w-full h-[500px] mx-auto rounded-lg bg-[#30D5C8]" ref={remoteVideoRef} autoPlay></video>
        </div>
    )
}

export default RemoteVideoView