import { useEffect, useState } from 'react';
import LoginImage from '../assets/login.svg'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUsername } from '../store/actions/DashboardActions';
import { connect } from 'react-redux'

function Login({saveUsername}){
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState(false);
    const { REACT_APP_API_ENDPOINT } = process.env;
    const navigate = useNavigate();
    
    async function SignIn(){
        const res = await axios.post(`${REACT_APP_API_ENDPOINT}/login/`,{
            'username':user,
            'password':password
        });

        if(res.status == 200){
            setSuccess(true);
            Cookies.set('token',res.data['token'])
            toast.success('Logged In Successfully');
            saveUsername(user)
            navigate('/')
        }else{
            setSuccess(false);
            toast.error('Failed to login, incorrect username or password - Try Again!!');
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-row">
                <div className='w-1/2'>
                    <img src={LoginImage}></img>
                </div>
                <div className="w-1/2 bg-[#30D5C8] flex flex-col gap-10 items-center justify-center rounded-lg">
                    <h1 className='text-3xl font-bold'>Login</h1>
                    <input  value={user} onChange={(e)=>{setUser(e.target.value)}} className="rounded-full p-2 w-1/2" placeholder="Username"></input>
                    <input  value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="rounded-full p-2 w-1/2" placeholder="Password"></input>
                    <button onClick={()=>{SignIn()}} type="button" className="rounded-full p-2 bg-[#055875] w-1/2 text-white">Submit</button>
                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </div>
    )
}

const mapActionsToProps = (dispatch) =>{
    return{
        saveUsername: username=> dispatch(setUsername(username))
    }
}

export default connect(null,mapActionsToProps)(Login)