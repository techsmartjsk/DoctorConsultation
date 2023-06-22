import { connect } from "react-redux";
import ActiveUserItem from "./ActiveUserItem"
function ActiveUsers({ activeUsers }){
    return(
        <div>
            {
                activeUsers.map((user)=>{
                    return <ActiveUserItem
                    key={user.socket}
                    user={user.username}
                    />
                })
            }
        </div>
    )
}

const mapStateToProps = ({ dashboard }) =>({
    ...dashboard
});

export default connect(mapStateToProps)(ActiveUsers)