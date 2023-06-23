import * as callAction from '../actions/callAction'

const initState = {
    localStream:'',
    callState:callAction.callStates.CALL_SET_CALL_STATE,
    callingDialogVisible:false,
    callerUsername:'',
    callRejected:{
        rejected:false,
        reason:''
    }
}


const callReducer = (state = initState,action) =>{
    switch (action.type) {
        case callAction.CALL_SET_LOCAL_STREAM:
            
            return{
                ...state,
                localStream: action.localStream
            }

        case callAction.CALL_SET_CALL_STATE:
            return{
                ...state,
                callState:action.callState
            }
        
        case callAction.CALL_SET_CALLING_DIALOG_VISIBLE:
            return{
                ...state,
                callingDialogVisible:action.visible
            }
        
        case callAction.CALL_SET_CALLER_USERNAME:
            return{
                ...state,
                callerUsername:action.callerUsername
            }
        
        case callAction.CALL_SET_CALL_REJECTED:
            return{
                ...state,
                callRejected:action.callRejected
            }
        default:
            return state
    }
}

export default callReducer