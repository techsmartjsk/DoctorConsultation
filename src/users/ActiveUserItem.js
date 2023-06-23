import { FaUserDoctor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import { callToOtherUser } from '../utils/webRTC/webRTCHandler';
function ActiveUserItem({key, user}){
    const navigate = useNavigate()
    const handleItemPressed = ()=>{
        callToOtherUser(user)
        navigate(`/consultation/${user.username}`)
    }
    return(
        <div onClick={handleItemPressed} className="mx-20 cursor-pointer bg-gray-200 p-4 rounded-md hover:bg-white">
            <div className="flex gap-5 items-center">
                <div className='w-[40px] h-[40px] rounded-full p-2 border-[1px] border-black flex justify-center items-center'>
                    <FaUserDoctor fontSize={'30px'}/>
                </div>
                <p className='text-[20px] uppercase'>{user.username}</p>
            </div>
        </div>
    )
} 

export default ActiveUserItem;