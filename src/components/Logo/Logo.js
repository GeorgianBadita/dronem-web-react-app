import React from 'react';
import dronemLogo from '../../assets/images/logo/logo.png';
import classes from './Logo.css';
import {withRouter} from "react-router-dom";

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={dronemLogo} alt={"Dronem"} onClick={() => {
            props.history.push('/');
        }}/>
    </div>
);

export default withRouter(Logo);