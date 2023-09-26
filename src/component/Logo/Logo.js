import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className="ma4 mt0 center">
            <Tilt className="Tilt br2 shadow-2">
                <div style={{height: '110px', width: '110px'}}>
                    <img style={{padding: '5px'}} alt='logo' src={brain} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;