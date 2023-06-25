import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CallRejectedDialog({reason,hideCallRejectedDialog}){
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            hideCallRejectedDialog({
                rejected:false,
                reason:''
            })
            navigate('/')
        },[2000])
    },[])
    return(
        <div className="flex justify-center mt-20 items-center">
            <div className="bg-red-500 w-fit text-white p-2 rounded-full">
                <p>{reason}</p>
            </div>
        </div>
    )
}

export default CallRejectedDialog