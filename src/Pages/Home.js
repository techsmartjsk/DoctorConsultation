import { useEffect } from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import { connect } from "react-redux";


function Home({ username, name, role }){
    return(
        <div>
            <Navbar/>
            <Hero user={username} name={name} role={role} />
        </div>
    )
}

const mapStateToProps = ({ dashboard }) =>({
    ...dashboard,
});


export default connect(mapStateToProps)(Home)