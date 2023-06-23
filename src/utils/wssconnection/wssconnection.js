import socketClient from 'socket.io-client'
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/DashboardActions'
import * as  webRTCHandler from '../../utils/webRTC/webRTCHandler'

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

    //listeners for direct call
    socket.on('pre-offer',(data)=>{
        console.log('Pre-Offer WSS',data)
        webRTCHandler.handlePreOffer(data)
    })

    socket.on('pre-offer-answer',(data)=>{
        webRTCHandler.handlePreOfferAnswer(data)
    })
}

export const registerNewUser = (username) =>{
    if (socket) {
        socket.emit('register-new-user', {
          username: username,
          socketId: socket.id
        });
    } else {
        console.log('Socket connection not established yet.');
    }
}


//emitting events related to server with direct call
export const sendPreOffer = (data)=>{
    socket.emit('pre-offer',data)
}

export const sendPreOfferAnswer = (data)=>{
    socket.emit('pre-offer-answer',data)
}

const handleBroadcastEvents = (data) =>{
    switch(data.event){
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter((user)=> user.socketId !== socket.id)
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;

        default:
            break;
    }
}