import { connect } from "react-redux"
import Navbar from "../Components/Navbar";
import ActiveUsers from "../users/ActiveUsers";
import { callStates, setCallRejected } from "../store/actions/callAction";
import CallDialog from "../Components/CallDialogs/CallDialog";
import IncomingCallDialog from "../Components/IncomingCallDialog/IncomingCallDialog";
import CallRejectedDialog from "../Components/CallRejectedDialog/CallRejectedDialog";
import { useEffect } from "react";
import * as webRTCHandler from '../utils/webRTC/webRTCHandler'
import store from "../store/store";

function DoctorList(props){

    useEffect(() => {
        webRTCHandler.getLocalStream();
    }, []);

    const { 
        callState,
        callerUsername,
        callingDialogVisible,
        callRejected,
        hideCallRejectedDialog 
    } = props; 

    return(
        <div>
            <Navbar/>
            <h1 className="text-center font-bold text-4xl">
                {store.getState().dashboard.role == 'doctor' ? 'Active Patients': 'Active Doctors, ready to help!'}
            </h1>
            <ActiveUsers/>

            {
                callingDialogVisible && <CallDialog/>
            }

            {
                callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername}/>
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