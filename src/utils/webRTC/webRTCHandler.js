import { useNavigate } from "react-router-dom"
import { callStates, setCallRejected, setCallState, setCallerUsername, setCallingDialogVisible, setLocalStream, setRemoteStream, setScreenSharingActive } from "../../store/actions/callAction"
import store from "../../store/store"
import * as wss from '../wssconnection/wssconnection'

const preOfferAnswers = {
    CALL_ACCEPTED:'CALL_ACCEPTED',
    CALL_REJECTED:'CALL_REJECTED',
    CALL_NOT_AVAILABLE:'CALL_NOT_AVAILABLE'
}

const defaultConstraints = {
    video:true,
    audio:true
}

const configuration = {
    iceServers:[
        {
            urls:'stun:stun.l.google.com:13902'
        }
    ]
}

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(defaultConstraints)
    .then(stream=>{
        store.dispatch(setLocalStream(stream));
        store.dispatch(setCallState(callStates.CALL_AVAILABLE))
        createPeerConnection();
    })
    .catch((err)=>{
        console.log(err)
    })
}

let connectedUserSocketId;
let peerConnection;

export const callToOtherUser = (calleeDetails)=>{
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
    store.dispatch(setCallingDialogVisible(true))

    wss.sendPreOffer({
        callee:calleeDetails,
        caller:{
            username:store.getState().dashboard.username
        }
    })
}

export const handlePreOffer = (data)=>{
    if(CheckIfCallIsPossible()){
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername))
        store.dispatch(setCallState(callStates.CALL_REQUESTED))
    }else{
        console.log(CheckIfCallIsPossible())
        wss.sendPreOfferAnswer({
            callerSocketId:data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        })
    }
    
}


export const acceptIncomingCallRequest = ()=>{
    wss.sendPreOfferAnswer({
        callerSocketId:connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    })

    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
}

export const rejectIncomingCallRequest = ()=>{
    console.log('Rejected!')
    wss.sendPreOfferAnswer({
        callerSocketId:connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    })
    resetCallData()
}

const createPeerConnection = ()=>{
    peerConnection = new RTCPeerConnection(configuration)
    const localStream = store.getState().call.localStream;

    for(const track of localStream.getTracks()){
        peerConnection.addTrack(track,localStream)
    }

    peerConnection.ontrack = ({streams:[stream]})=>{
        store.dispatch(setRemoteStream(stream))
    }

    peerConnection.onicecandidate = (event)=>{
        console.log('getting candidates from stun server')
        if(event.candidate){
            wss.sendWebRTCCandidate({
                candidate:event.candidate,
                connectedUserSocketId:connectedUserSocketId
            })
        }
    }

    peerConnection.onconnectionstatechange = (event)=>{
        if(peerConnection.connectionState === 'connected'){
            console.log('Successfully connected to Other peer!')
        }
    }
}

export const handlePreOfferAnswer = (data)=>{
    store.dispatch(setCallingDialogVisible(false))
    if(data.answer === preOfferAnswers.CALL_ACCEPTED){
        sendOffer()
    }else{
        let rejectionReason;
        console.log(rejectionReason)
        if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE){
            rejectionReason = 'Callee is not able to pick up right now!'
        }else{
            rejectionReason = 'Call Rejected'
        }

        store.dispatch(setCallRejected({
            rejected:true,
            reason:rejectionReason
        }))

        resetCallData();
    }

}

const sendOffer = async ()=>{
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)

    wss.sendWebRTCOffer({
        calleeSocketId:connectedUserSocketId,
        offer:offer
    })
}


export const handleOffer = async(data)=>{
    await peerConnection.setRemoteDescription(data.offer)
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer)

    wss.sendWebRTCAnswer({
        callerSocketId:connectedUserSocketId,
        answer:answer
    })
}

export const handleAnswer = async (data)=>{
    await peerConnection.setRemoteDescription(data.answer)
}

export const handleCandidate = async (data)=>{
    try{
        console.log('getting Ice Candidates',data)
        await peerConnection.addIceCandidate(data.candidate)
    }catch(err){
        console.log('Error Occurred!')
    }
}

export const CheckIfCallIsPossible = ()=>{
    if(store.getState().call.callState !== callStates.CALL_AVAILABLE){
        return false;
    }else{
        return true
    }
}

export const resetCallData = ()=>{
    connectedUserSocketId = null
    store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}

let screenSharingStream;

export const switchForScreenSharingStream = async () => {
    if(!store.getState().call.screenSharingActive){
        try{
            screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video:true })
            store.dispatch(setScreenSharingActive(true))
            const senders = peerConnection.getSenders()
            const sender = senders.find(sender => sender.track.kind == screenSharingStream.getVideoTracks()[0].kind)
            sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
        }catch(err){
            console.log('Error',err)
        }
    }else{
        const localStream = store.getState().call.localStream;
        const senders = peerConnection.getSenders()
        const sender = senders.find(sender => sender.track.kind == localStream.getVideoTracks()[0].kind)
        sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
        store.dispatch(setScreenSharingActive(false))
        screenSharingStream.getTracks().forEach(track=>track.stop())
    }
}

export const handleUserHangedUp = () =>{
    resetCallDataAfterHangUp()
}

export const hangUp = () => {
    wss.sendUserHangedUp({
        connectedUserSocketId: connectedUserSocketId
    })

    resetCallDataAfterHangUp()
}

export const resetCallDataAfterHangUp = () => {
    store.dispatch(setRemoteStream(null))

    peerConnection.close();
    peerConnection = null;
    createPeerConnection();
    resetCallData();

    if(store.getState().call.screenSharingActive){
        screenSharingStream.getTracks().forEach(track => {
            track.stop();
        })
    }
}