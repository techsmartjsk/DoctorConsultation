import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setUsername } from "../store/actions/DashboardActions";

function PrivateRoutes({saveUsername}){
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
                console.log(res.data['username'])
                setIsAuth(true)
                saveUsername(res.data['username'])
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

const mapActionsToProps = (dispatch) =>{
    return{
        saveUsername: username=> dispatch(setUsername(username))
    }
}

export default connect(null,mapActionsToProps)(PrivateRoutes)