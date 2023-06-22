import socketClient from 'socket.io-client'
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/DashboardActions'
const { REACT_APP_API_ENDPOINT } = process.env;

let socket;
const broadcastEventTypes = {
    ACTIVE_USERS:'ACTIVE_USERS'
}

export const connectionWithWebSocket = ()=>{
    socket = socketClient(REACT_APP_API_ENDPOINT);
    socket.on('connection',() =>{
        console.log('Sucessfully connected with WSS server!')
        console.log(socket.id)
    })

    socket.on('broadcast',(data)=>{
        handleBroadcastEvents(data)
    })
}

export const registerNewUser = (username) =>{
    socket.emit('register-new-user',{
        username:username,
        socketId:socket.id
    })
}

const handleBroadcastEvents = (data) =>{
    switch(data.event){
        case broadcastEventTypes.ACTIVE_USERS:
            store.dispatch(dashboardActions.setActiveUsers(data.activeUsers));
            break;

        default:
            break;
    }
}