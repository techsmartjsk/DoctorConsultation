import { connect } from "react-redux"
import Navbar from "../Components/Navbar";
import ActiveUsers from "../users/ActiveUsers";
import { callStates, setCallRejected } from "../store/actions/callAction";
import CallDialog from "../Components/CallDialogs/CallDialog";
import IncomingCallDialog from "../Components/IncomingCallDialog/IncomingCallDialog";
import CallRejectedDialog from "../Components/CallRejectedDialog/CallRejectedDialog";

function DoctorList(props){

    const { callState,callerUsername,callingDialogVisible,callRejected,hideCallRejectedDialog } = props; 

    return(
        <div>
            <Navbar/>
            <h1 className="text-center font-bold text-4xl">Active Doctors, ready to help!</h1>
            <ActiveUsers/>

            {
                callingDialogVisible && <CallDialog/>
            }

            {
                (callState == callStates.CALL_REQUESTED) && <IncomingCallDialog callerUsername={callerUsername}/>
            }

            { callRejected.rejected &&    
            <CallRejectedDialog 
                reason={callRejected.reason}
                hideCallRejectedDialog={hideCallRejectedDialog}
                />}
        </div>
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

export default connect(mapStoreStatesToProps,mapDispatchToProps)(DoctorList);