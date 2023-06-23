import { connect } from "react-redux"
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import CallDialog from "../CallDialogs/CallDialog"
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import { callStates, setCallRejected } from "../../store/actions/callAction";
const DirectCall = (props)=>{

    const { localStream, remoteStream,callState,callerUsername,callingDialogVisible, callRejected, hideCallRejectedDialog } = props; 
    return(
        <>
            <LocalVideoView localStream={localStream}/>
            {
                remoteStream && 
                <RemoteVideoView remoteStream={remoteStream} />
            }

            {
                callingDialogVisible && <CallDialog/>
            }

            {
                (callState == callStates.CALL_REQUESTED) && <IncomingCallDialog callerUsername={callerUsername}/>
            }
             
            { callRejected.rejected &&    <CallRejectedDialog 
            reason={callRejected.reason}
            hideCallRejectedDialog={hideCallRejectedDialog}
            />}
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
        hideCallRejectedDialog:(callRejectionDetails)=> dispatch(setCallRejected(callRejectionDetails))
    }
}

export default connect(mapStoreStatesToProps,mapDispatchToProps)(DirectCall)

