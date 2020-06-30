import React, {Component} from 'react';
import classes from "./RegisterPage.css";
import RegisterForm from "../../auth/RegisterForm/RegisterForm";
import {withRouter} from "react-router-dom";

class RegisterPage extends Component {
    render() {
        return (
            <div className={classes.RegisterPage}>
                <RegisterForm/>
            </div>
        )
    }
}

export default withRouter(RegisterPage);
