import { useNavigate } from "react-router-dom"
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from "../../utils/webRTC/webRTCHandler"

export default function IncomingCallDialog({ callerUsername }){
    const navigate = useNavigate()
    const handleAccept = ()=>{
        acceptIncomingCallRequest()
        navigate('/consultation')
    }
    
    const handleDecline = ()=>{
        rejectIncomingCallRequest()
    }
    return(
        <div className="absolute bottom-[20%] left-[80%]">
            <div className="p-2 border-[1px] w-[200px] h-[150px] rounded-lg text-center relative">
                <p className="mt-10">{callerUsername} Calling....</p>
                <div className="flex gap-10 absolute bottom-[10%] w-full items-center justify-center">
                    <button onClick={handleAccept} className="p-2 rounded-full bg-green-500 text-white">Accept</button>
                    <button onClick={handleDecline} className="p-2 rounded-full bg-red-500 text-white">Decline</button>
                </div>
            </div>
        </div>
    )
}