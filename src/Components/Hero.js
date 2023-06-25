import { useNavigate } from 'react-router-dom'
import HeroImage from '../assets/Hero.svg'
import { registerNewUser } from '../utils/wssconnection/wssconnection'
export default function Hero({user , name, role}){
    const navigate = useNavigate()
    console.log(name)
    console.log(role)
    return(
        <div>
            <div className='flex gap-10 items-center mx-20'>
                <div className='w-[50%]'>
                    <img src={HeroImage}></img>
                </div>
                <div className='w-[50%] flex flex-col gap-10'>
                    <h1 className='text-5xl font-bold'>First Aid Consulation App</h1>
                    <h3 className='text-2xl'>Fast, reliable healthcare support at your fingertips.</h3>
                    {
                        role == 'doctor' ? <button 
                        className='bg-[#055875] rounded-full hover:brightness-[80%] text-white px-4 py-2'
                        onClick={()=>{
                            registerNewUser(user)
                            navigate('/find')
                        }}>Ready to Accept Consultations</button>:<button 
                        className='bg-[#055875] rounded-full hover:brightness-[80%] text-white px-4 py-2'
                        onClick={()=>{
                            registerNewUser(user)
                            navigate('/find')
                        }}>Get Connected with Doctors</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}