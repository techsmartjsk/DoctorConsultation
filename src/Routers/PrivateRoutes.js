import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setName, setUserRole, setUsername } from "../store/actions/DashboardActions";

function PrivateRoutes({saveUsername, saveName, saveUserRole}){
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
                console.log(res)
                setIsAuth(true)
                saveUsername(res.data['username'])
                saveName(res.data['name'])
                saveUserRole(res.data['role'])
            }).catch((e)=>{
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
        saveUsername: username => dispatch(setUsername(username)),
        saveName: name => dispatch(setName(name)),
        saveUserRole: role => dispatch(setUserRole(role))
    }
}

export default connect(null,mapActionsToProps)(PrivateRoutes)