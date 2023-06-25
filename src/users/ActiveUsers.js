import { connect } from "react-redux";
import ActiveUserItem from "./ActiveUserItem"
import store from "../store/store";
import { MdOutlineError } from "react-icons/md"
function ActiveUsers({ activeUsers }){
    return(
        <div>
            {
               activeUsers.length > 0 ? activeUsers.map((user)=>{
                    return <ActiveUserItem
                    key={user.socketId}
                    user={user}
                    />
                }) : <div className="text-center text-xl mt-10 gap-5 text-red-500 flex items-center justify-center"><MdOutlineError color="red"/> No Active {store.getState().dashboard.role == 'doctor' ? 'Patients!':'Doctors'}</div>
            }
        </div>
    )
}

const mapStateToProps = ({ dashboard }) =>({
    ...dashboard
});

export default connect(mapStateToProps)(ActiveUsers)