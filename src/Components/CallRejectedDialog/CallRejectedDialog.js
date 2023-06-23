import { useEffect } from "react"

function CallRejectedDialog({reason,hideCallRejectedDialog}){

    useEffect(()=>{
        setTimeout(()=>{
            hideCallRejectedDialog({
                rejected:false,
                reason:''
            })
        },[4000])
    },[])
    return(
        <div className="bg-red-500 text-white p-2 rounded-full">
            <p>{reason}</p>
        </div>
    )
}

export default CallRejectedDialog