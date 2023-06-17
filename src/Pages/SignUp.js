import { useState } from 'react'
import SignUpImage from '../assets/login.svg'
import axios from 'axios'

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);
    const { REACT_APP_API_ENDPOINT } = process.env;
    const navigate = useNavigate();
    async function Register(){
        const res = await axios.post(`${REACT_APP_API_ENDPOINT}/register`,{
            'username':username,
            'password':password
        });

        if(res.status == 200){
            setSuccess(true);
            toast.success('Registered Successfully');
            navigate('/login')
        }else{
            setSuccess(false);
            toast.error('Unable to Register, username already registered!')
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-row">
                <div className='w-1/2'>
                    <img src={SignUpImage}></img>
                </div>
                <div className="w-1/2 bg-[#30D5C8] flex flex-col gap-10 items-center justify-center rounded-lg">
                    <h1 className='text-3xl font-bold'>Sign Up</h1>
                    <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className="rounded-full p-2 w-1/2" placeholder="Username"></input>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="rounded-full p-2 w-1/2" placeholder="Password"></input>
                    <button onClick={()=>{Register()}} type="button" className="rounded-full p-2 bg-[#055875] w-1/2 text-white">Submit</button>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    )
}