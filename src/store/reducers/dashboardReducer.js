import * as dashboardActions from '../actions/DashboardActions'

const initState = {
    username:'',
    activeUsers:[],
    name:'',
    role:''
}


const reducer = (state = initState,action) =>{
    switch (action.type) {
        case dashboardActions.DASHBOARD_SET_USERNAME:
            
            return{
                ...state,
                username: action.username
            }

        case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.activeUsers
            }

        case dashboardActions.DASHBOARD_SET_NAME:
            return{
                ...state,
                name:action.name
            }

        case dashboardActions.DASHBOARD_SET_USER_ROLE:
            return{
                ...state,
                role:action.role
            }
        default:
            return state
    }
}

export default reducer