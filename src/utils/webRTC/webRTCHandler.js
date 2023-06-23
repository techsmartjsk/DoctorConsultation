import { callStates, setCallRejected, setCallState, setCallerUsername, setCallingDialogVisible, setLocalStream } from "../../store/actions/callAction"
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

export const getLocalStream = ()=>{
    navigator.mediaDevices.getUserMedia(defaultConstraints)
    .then(stream=>{
        store.dispatch(setLocalStream(stream));
        store.dispatch(setCallState(callStates.CALL_AVAILABLE))
    })
    .catch((err)=>{
        console.log('Error While Configuring Local Stream!')
        console.log(err)
    })
}

let connectedUserSocketId;

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
        wss.sendPreOfferAnswer({
            callerSocketId:data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        })
    }
    
}

export const CheckIfCallIsPossible = ()=>{
    if(store.getState().call.localStream === null || 
    store.getState().call.callState !== callStates.CALL_AVAILABLE){
        console.log("Here I was")
        return false;
    }else{
        console.log("Here I am")
        return true
    }
}

export const acceptIncomingCallRequest = ()=>{
    wss.sendPreOfferAnswer({
        callerSocketId:connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    })
}

export const rejectIncomingCallRequest = ()=>{
    resetCallData()
    wss.sendPreOfferAnswer({
        callerSocketId:connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    })
}

export const resetCallData = ()=>{
    connectedUserSocketId = null
    store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}

export const handlePreOfferAnswer = (data)=>{
    store.dispatch(setCallingDialogVisible(false))
    if(data.answer === preOfferAnswers.CALL_ACCEPTED){
        //send WebRTC Call
    }else{
        let rejectionReason;
        if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE){
            rejectionReason = 'Callee is not able to pick up right now!'
        }else{
            rejectionReason = 'Call Rejected'
        }

        store.dispatch(setCallRejected({
            rejected:true,
            reason:rejectionReason
        }))
    }

}