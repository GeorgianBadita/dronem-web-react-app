import React, {Component} from 'react';
import classes from "./LoginPage.css";
import LoginForm from "../../auth/LoginForm/LoginForm";
import {withRouter} from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <div className={classes.LoginPage}>
                <LoginForm/>
            </div>
        )
    }
}

export default withRouter(LoginPage);
