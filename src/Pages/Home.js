import { useEffect } from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import { connectionWithWebSocket } from "../utils/wssconnection/wssconnection";
import ActiveUsers from "../users/ActiveUsers";

export default function Home(){

    return(
        <div>
            <Navbar/>
            <Hero/>
            <ActiveUsers/>
        </div>
    )
}