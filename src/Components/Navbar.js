import { useEffect, useState } from 'react';
import Logo from '../assets/logo.png'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';

export default function Navbar(){
    const cookieValue = Cookies.get('token');
    const [auth,setAuth] = useState(false);
    const navigate = useNavigate()

    const { REACT_APP_API_ENDPOINT } = process.env;

    useEffect(()=>{
        if(cookieValue != undefined){
            fetchToken()
        }else{
            setAuth(false)
        }
    },[])

    const handleLogOut = ()=>{
        Cookies.remove('token')
        navigate('/login')
    }

    async function fetchToken(){
        const res = await axios.get(`${REACT_APP_API_ENDPOINT}/check-token`,{
            headers:{
                Authorization:`Bearer ${cookieValue}`
            }
        })

        if(res.status != 401){
            setAuth(true)
        }
    }
    return(
        <nav className="bg-[#30D5C8] m-4 rounded-full p-4">
            <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <a href="/"><img src={Logo} alt="Logo" className='rounded-full h-[50px]' /></a>
                <span className="text-[#055875] ml-2 text-2xl">First Aid</span>
            </div>
            <div className="flex items-center space-x-12">
                <input
                type="text"
                placeholder="Search"
                className="p-2 border text-sm rounded-full w-[300px] border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <a href="/about" className="hover:bg-white hover:text-[#055875] p-2 rounded-full">About Us</a>
                {
                    !auth ? <div className="flex gap-4">
                    <a href="/signup" className="bg-white rounded-full hover:bg-[#30D5C8] hover:text-white text-[#30D5C8] px-4 py-2">
                        Signup
                    </a>
                    <a href="/login" className="bg-[#055875] rounded-full hover:bg-white hover:text-[#055875] text-white px-4 py-2">
                        Login
                    </a>
                </div> : <div className="flex gap-4 items-center justify-center">
                    <p>Hey, {store.getState().dashboard.role == 'doctor' ? 'Dr. ': null} {store.getState().dashboard.name}</p>
                    <button onClick={handleLogOut} className="bg-[#055875] rounded-full hover:bg-white hover:text-[#055875] text-white px-4 py-2">Logout</button>
                </div>
                }
            </div>
            </div>
        </nav>
    )
}