import React, {Component} from 'react';

import classes from "./PasswordResetRequestPage.css";
import PasswordResetRequestForm from "../../auth/PasswordResetRequestForm/PasswordResetRequestForm";
import Aux from "../../hoc/Aux/Aux";
import Button from "@material-ui/core/Button";
import axios from '../../axios-config';
import Spinner from "../../components/UI/Spinner/Spinner";
import {validateResetPasswordRequestForm} from "../../validators/formValidators";

class PasswordResetRequestPage extends Component {

    state = {
        requestEmailSent: false,
        email: null,
        loading: false,
        emailError: ""
    }

    onEmailChanged = (event) => {
        const newEmail = event.target.value;
        this.setState({email: newEmail});
    }

    sendEmail = () => {
        const {emailError} = validateResetPasswordRequestForm({email: this.state.email});
        this.setState({emailError: emailError});
        if(emailError.length > 0){
            return;
        }
        this.setState({loading: true});
        const email = this.state.email;
        const payload = {
            email: email
        }
        axios.post('/users/password-reset-requests/', payload)
            .then(response => {
                console.log(response.status);
                if (response.status === 201) {
                    this.setState({loading: false, requestEmailSent: true})
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            })
    }

    render() {
        let spinner = null;
        let form = !this.state.requestEmailSent ?
            <PasswordResetRequestForm error={this.state.emailError}
                                      emailChanged={this.onEmailChanged}
                                      sendBtnClicked={this.sendEmail}
            /> : null;
        let confirmSent = this.state.requestEmailSent ? <Aux>
                <p>If the email introduced is in our database you should receive an email shortly</p>
                <Button variant="contained" color="primary" onClick={() => this.sendEmail()}>Send again?</Button>
            </Aux>
            : null
        if (this.state.loading) {
            spinner = <Spinner/>
            form = null;
            confirmSent = null;
        }

        return (
            <div className={classes.PwdReqPage}>
                {spinner}
                {form}
                {confirmSent}
            </div>
        );
    }
}

export default PasswordResetRequestPage;