export default function ConversationButton(props){
    const { onClickHandler } = props;

    return(
        <button className="w-[50px] h-[50px] rounded-full bg-[#282C34] flex justify-center items-center" onClick={onClickHandler}>
            {props.children}
        </button>
    )   
}