export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_NAME = 'DASHBOARD.SET_NAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD_SET_ACTIVE_USERS';
export const DASHBOARD_SET_USER_ROLE = 'DASHBOARD_SET_USER_ROLE'

export const setUsername = (username) =>{
    return {
        type: DASHBOARD_SET_USERNAME,
        username
    }
}

export const setName = (name) =>{
    return{
        type: DASHBOARD_SET_NAME,
        name
    }
}

export const setUserRole = (role) =>{
    return{
        type: DASHBOARD_SET_USER_ROLE,
        role
    }
}

export const setActiveUsers = (activeUsers) =>{
    return {
        type: DASHBOARD_SET_ACTIVE_USERS,
        activeUsers
    }
}