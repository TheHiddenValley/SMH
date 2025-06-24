import React from "react";
import logo from "../Images/logo.png";
import Liner from "../Images/Group_481923.png";

function Navbar(props) {
    return (
        <nav className="navbar">
            <div className="container-head">
                <img src={Liner} alt="Divider" style={{ height: '10px', width: '1000px' }} /> 
                    <h1>⠀⠀Radiate your PFP⠀⠀</h1>                    
                <img src={Liner} alt="Divider" style={{ height: '10px', width: '1000px' }} /> 
            </div>
        </nav>
    );
}

export default Navbar;
