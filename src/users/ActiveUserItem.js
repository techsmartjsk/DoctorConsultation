function ActiveUserItem({key, user}){

    const handleItemPressed = ()=>{
        //call the other user
    }
    return(
        <div onClick={handleItemPressed}>
            <div>{user}</div>
        </div>
    )
} 

export default ActiveUserItem;