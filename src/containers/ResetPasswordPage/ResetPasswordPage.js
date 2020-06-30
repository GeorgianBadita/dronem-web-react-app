import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PasswordResetConfirmForm from "../../auth/PasswordConfirmForm/PasswordConfirmForm";
import classes from './ResetPasswordPage.css';
import axios from '../../axios-config';
import Spinner from "../../components/UI/Spinner/Spinner";
import {validateResetPasswordForm} from "../../validators/formValidators";

class ResetPasswordPage extends Component {

    state = {
        successChange: false,
        token: null,
        newPassword: null,
        repeatNewPassword: null,
        invalidToken: false,
        loading: false,
        passwordError: "",
        passwordConfirmError: ""
    }


    componentWillMount() {
        const token = this.props.match.params.token;
        this.setState({loading: true, token: token});
        axios.get('/users/password-reset-requests/' + token + '/')
            .then(response => {
                if (response.status === 200) {
                    //TODO change this because triggers re-rendering
                    this.setState({loading: false});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false, invalidToken: true});
            })
    }


    newPasswordChangedHandler = (event) => {
        const newPassword = event.target.value;
        this.setState({newPassword: newPassword});
    }

    newPasswordRepeatChangeHandler = (event) => {
        const newPassword = event.target.value;
        this.setState({repeatNewPassword: newPassword});
    }


    onNewPasswordChangedClicked = () => {
        const {passwordError, passwordConfirmError} = validateResetPasswordForm({
            password: this.state.newPassword,
            passwordConfirm: this.state.repeatNewPassword
        })
        this.setState({passwordError: passwordError, passwordConfirmError: passwordConfirmError});
        if (passwordError.length > 0 || passwordConfirmError.length > 0) {
            return;
        }

        this.setState({loading: true});
        const payload = {
            token: this.state.token,
            new_password: this.state.newPassword
        }

        axios.post('/users/password-reset-confirmation/', payload)
            .then(response => {
                if (response.status === 200) {
                    this.setState({loading: false, successChange: true})
                }
            })
            .catch(err => {
                console.log(err);
                //TODO maybe it's not the case for invalid token, investigate this
                this.setState({loading: false, invalidToken: true});
            });
    }

    render() {
        console.log(this.state);

        let spinner = null;
        let form = !this.state.successChange && !this.state.invalidToken ? <PasswordResetConfirmForm
            errors={{passwordError: this.state.passwordError, passwordConfirmError: this.state.passwordConfirmError}}
            onNewPasswordChanged={this.newPasswordChangedHandler}
            onPasswordChangeClick={this.onNewPasswordChangedClicked}
            onNewPasswordChangedRepeat={this.newPasswordRepeatChangeHandler}
        /> : this.state.successChange ? <p>Password successfully changed!</p> : null;
        let invalidToken = this.state.invalidToken ? <p>Sorry your token is invalid!</p> : null

        if (this.state.loading) {
            spinner = <Spinner/>
            form = null;
        }
        return (
            <div className={classes.ResetPassPage}>
                {spinner}
                {form}
                {invalidToken}
            </div>

        )
    }
}

export default withRouter(ResetPasswordPage);