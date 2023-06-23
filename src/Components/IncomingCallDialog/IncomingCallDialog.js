import { acceptIncomingCallRequest, rejectIncomingCallRequest } from "../../utils/webRTC/webRTCHandler"

export default function IncomingCallDialog({ callerUsername }){
    const handleAccept = ()=>{
        acceptIncomingCallRequest()
    }
    
    const handleDecline = ()=>{
        rejectIncomingCallRequest()
    }
    return(
        <div>
            <div>
                <p>{callerUsername} Calling....</p>
                <div className="flex gap-10">
                    <button onClick={handleAccept} className="p-2 rounded-full bg-green-500 text-white">Accept</button>
                    <button onClick={handleDecline} className="p-2 rounded-full bg-red-500 text-white">Decline</button>
                </div>
            </div>
        </div>
    )
}