import { useEffect, useRef } from "react";
import Navbar from "../Navbar";

const LocalVideoView = props =>{
    const { localStream } = props;
    const localVideoRef = useRef()

    useEffect(()=>{
        if(localStream){

            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadedmetadata = ()=>{
                localVideo.play();
            }
        }
    },[localStream])

    return(
        <div>
            <div className="w-full block">
                <video className="w-[200px] float-right rounded-lg bg-[#30D5C8]" ref={localVideoRef} autoPlay muted></video>
            </div>
        </div>
    )
}

export default LocalVideoView