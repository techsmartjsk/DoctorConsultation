import { useEffect } from "react";
import DirectCall from "../Components/DirectCall/DirectCall";
import * as webRTCHandler from '../utils/webRTC/webRTCHandler'
import { useParams } from "react-router-dom";

export default function Consultation(){

    const { user } = useParams()
    useEffect(()=>{
        webRTCHandler.getLocalStream()
    },[])

    return(
        <DirectCall/>
    )
}