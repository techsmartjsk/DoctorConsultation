import { connect } from "react-redux"
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import CallDialog from "../CallDialogs/CallDialog"
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled } from "../../store/actions/callAction";
import Navbar from "../Navbar";
import ConversationButtons from "../ConversationButtons/ConversationButtons";
const DirectCall = (props)=>{


    const { 
        localStream, 
        remoteStream,
        callState,
        callerUsername,
        callingDialogVisible, 
        callRejected, 
        hideCallRejectedDialog
    } = props; 

    return(
        <>
            <Navbar/>
            <h1 className="text-center text-4xl">Doctor Video Consultation in Progress</h1>
            <div className="pl-10 pr-10">

                
                <LocalVideoView localStream={localStream}/>
                {
                    remoteStream && 
                    callState == callStates.CALL_IN_PROGRESS &&
                    <RemoteVideoView remoteStream={remoteStream} />
                }

                { 
                    callRejected.rejected &&  <CallRejectedDialog 
                    reason={callRejected.reason}
                    hideCallRejectedDialog={hideCallRejectedDialog}
                    />
                }

                {
                    callingDialogVisible && <CallDialog/>
                }

                {
                    callState == callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername}/>
                }

                {
                    remoteStream && 
                    callState == callStates.CALL_IN_PROGRESS &&
                    <ConversationButtons {...props}/>
                }

            </div>
             
        </>
    )
}

function mapStoreStatesToProps({call}){
    return{
        ...call
    }
}

function mapDispatchToProps(dispatch){
    return{
        hideCallRejectedDialog:(callRejectionDetails)=> dispatch(setCallRejected(callRejectionDetails)),
        setCameraEnabled:(enabled)=>dispatch(setLocalCameraEnabled(enabled)),
        setMicrophoneEnabled:(enabled)=>dispatch(setLocalMicrophoneEnabled(enabled))
    }
}

export default connect(mapStoreStatesToProps,mapDispatchToProps)(DirectCall)

