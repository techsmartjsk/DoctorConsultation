import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { connectionWithWebSocket, registerNewUser } from "../utils/wssconnection/wssconnection";

export default function PrivateRoutes(){
    const [isAuth,setIsAuth] = useState()
    const { REACT_APP_API_ENDPOINT } = process.env;
    const token = Cookies.get('token')
    const navigate = useNavigate()

    async function checkIfAuth(){
        if(token != undefined){
            axios.get(`${REACT_APP_API_ENDPOINT}/check-token`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((res)=>{
                setIsAuth(true)
            }).catch((e)=>{
                console.log(e)
                setIsAuth(false)
            })
        }else{
            setIsAuth(false)
            navigate('/login')
        }
    }

    useEffect(() => {
        checkIfAuth()
    }, []);
  
    if (isAuth === undefined) {
      return null; // or loading indicator/spinner/etc
    }
    return isAuth ? <Outlet/>:<Navigate to="/login"/>
}