import React, {Component} from 'react';
import {TextField, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import {validateSignUpForm} from '../../validators/formValidators';
import {useStyles} from "../../constants";

import axios from '../../axios-config';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

class RegisterForm extends Component {

    state = {
        username: null,
        password: null,
        passwordConfirm: null,
        email: null,
        emailConfirm: null,
        usernameError: "",
        emailError: "",
        emailConfirmError: "",
        passwordError: "",
        passwordConfirmError: ""
    }

    usernameChanged = (event) => {
        const newUsername = event.target.value;
        this.setState({username: newUsername});
    }


    passwordChanged = (event) => {
        const passwordChanged = event.target.value;
        this.setState({password: passwordChanged});
    }


    passwordConfirmChanged = (event) => {
        const newPasswordConfirm = event.target.value;
        this.setState({passwordConfirm: newPasswordConfirm});
    }


    emailChanged = (event) => {
        const newEmail = event.target.value;
        this.setState({email: newEmail});
    }


    emailConfirmChanged = (event) => {
        const newEmailConfirmed = event.target.value;
        this.setState({emailConfirm: newEmailConfirmed});
    }

    singUp = () => {
        const {
            usernameError, emailError, emailConfirmError, passwordError, passwordConfirmError
        } = validateSignUpForm({
            username: this.state.username, email: this.state.email,
            emailConfirm: this.state.emailConfirm, password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        });

        this.setState({
            usernameError: usernameError, emailError: emailError, emailConfirmError: emailConfirmError,
            passwordError: passwordError, passwordConfirmError: passwordConfirmError
        });
        if (usernameError.length > 0 || emailError.length > 0 || emailConfirmError.length > 0 ||
            passwordError.length > 0 || passwordConfirmError.length > 0) {
            return;
        }

        const payload = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/users/signup/', payload)
            .then(response => {
                console.log(response);
                this.props.history.push('/login');
            })
            .catch(err => {
                    let errText = '';
                    if (err.response.data['username']) {
                        errText = err.response.data['username'][0]
                    } else if (err.response.data['password']) {
                        errText = err.response.data['password'][0];
                    } else if (err.response.data['email']) {
                        errText = err.response.data['email'][0];
                    } else {
                        errText = err.response.data['non_field_errors'][0]
                    }
                    toast.error(errText, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            );
    }

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.root} noValidate autoComplete={"on"}>
                <h1 className={classes.header}>Register</h1>

                <TextField label={"Username"}
                           error={this.state.usernameError.length > 0}
                           helperText={this.state.usernameError}
                           onChange={(event => this.usernameChanged(event))}
                />
                <TextField label={"Email"}
                           error={this.state.emailError.length > 0}
                           helperText={this.state.emailError}
                           onChange={(event => this.emailChanged(event))}
                />
                <TextField label={"Confirm email"}
                           error={this.state.emailConfirmError.length > 0}
                           helperText={this.state.emailConfirmError}
                           onChange={(event => this.emailConfirmChanged(event))}
                />
                <TextField label={"Password"}
                           error={this.state.passwordError.length > 0}
                           helperText={this.state.passwordError}
                           type={"password"}
                           onChange={(event => this.passwordChanged(event))}
                />
                <TextField
                    label={"Confirm password"}
                    error={this.state.passwordConfirmError.length > 0}
                    helperText={this.state.passwordConfirmError}
                    type={"password"}
                    onChange={(event => this.passwordConfirmChanged(event))}
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={this.singUp}>
                    Sign Up
                </Button>
            </form>
        );
    }
}

export default withRouter(withStyles(useStyles)(RegisterForm));