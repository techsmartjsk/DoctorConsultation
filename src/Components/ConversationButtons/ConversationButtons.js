import {MdCallEnd, MdMic, MdMicOff,MdVideocam, MdVideocamOff,MdVideoLabel,MdVideoCall,MdCamera} from 'react-icons/md'
import ConversationButton from './ConversationButton'
import { hangUp, switchForScreenSharingStream } from '../../utils/webRTC/webRTCHandler'
import { useNavigate } from 'react-router-dom'


const styles = {
    icon:{
        width:'25px',
        height:'25px',
        fill:'#e6e5e8'
    }
}

export default function ConversationButtons(props){

    const navigate = useNavigate()

    const {
        localStream,
        localCameraEnabled,
        localMicrophoneEnabled,
        screenSharingActive,
        setCameraEnabled,
        setMicrophoneEnabled
    } = props

    const handleMicButtonPressed = () => {
        const micEnabled = localMicrophoneEnabled;
        localStream.getAudioTracks()[0].enabled = !micEnabled;
        setMicrophoneEnabled(!micEnabled)
    }

    const handleCameraButtonPressed = () => {
        const cameraEnabled = localCameraEnabled;
        localStream.getVideoTracks()[0].enabled = !cameraEnabled;
        setCameraEnabled(!cameraEnabled)
    }

    const handleScreenSharingButtonPressed = () => {
        switchForScreenSharingStream()
    }


    const handleHangedUpButtonPressed = () =>{
        hangUp();
        navigate('/')
    }

    return(
        <div className='flex gap-5 absolute w-full justify-center items-center bottom-[20%]'>
            <ConversationButton onClickHandler={handleMicButtonPressed}>
                { localMicrophoneEnabled ? <MdMic style={styles.icon}/> : <MdMicOff style={styles.icon} />}
            </ConversationButton>
            <ConversationButton onClickHandler={handleHangedUpButtonPressed}>
                <MdCallEnd style={styles.icon}/>
            </ConversationButton>
            <ConversationButton onClickHandler={handleCameraButtonPressed}>
                { localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} /> }
            </ConversationButton>
            <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
                {screenSharingActive ? <MdCamera style={styles.icon}/>: <MdVideoLabel style={styles.icon}/> }
            </ConversationButton>
        </div>
    )
}