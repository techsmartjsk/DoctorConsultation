export const callStates = {
    CALL_UNAVAILABLE:'CALL_UNAVAILABLE',
    CALL_AVAILABLE:'CALL_AVAILABLE',
    CALL_REQUESTED:'CALL_REQUESTED',
    CALL_IN_PROGRESS:'CALL_IN_PROGRESS'
}
export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM'
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE'
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME'
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE'
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED'

export const setLocalStream = (localStream) =>{
    return{
        type:CALL_SET_LOCAL_STREAM,
        localStream
    }
}

export const setCallState = (callState) =>{
    return{
        type: CALL_SET_CALL_STATE,
        callState
    }
}

export const setCallingDialogVisible = (visible)=>{
    return{
        type:CALL_SET_CALLING_DIALOG_VISIBLE,
        visible
    }
}

export const setCallerUsername = (callerUsername)=>{
    console.log(callerUsername)
    return{
        type:CALL_SET_CALLER_USERNAME,
        callerUsername
    }
}

export const setCallRejected = (callRejectedDetails)=>{
    return{
        type: CALL_SET_CALL_REJECTED,
        callRejected:{
            rejected:callRejectedDetails.rejected,
            reason:callRejectedDetails.reason
        }
    }
}