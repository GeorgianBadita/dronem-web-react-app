import React, {Component} from 'react';
import './LoginForm.css'
import {Button, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "../../constants";
import {Link, withRouter} from "react-router-dom";
import {validateSignInForm} from '../../validators/formValidators';
import AuthStore from '../authStore';
import axios from '../../axios-config';
import 'react-toastify/dist/ReactToastify.min.css'
import {toast} from "react-toastify";

class LoginForm extends Component {

    state = {
        username: null,
        password: null,
        usernameError: "",
        passwordError: ""
    }

    usernameChanged = (event) => {
        const newUsername = event.target.value;
        this.setState({username: newUsername});
    }


    passwordChanged = (event) => {
        const passwordChanged = event.target.value;
        this.setState({password: passwordChanged});
    }


    signIn = () => {
        const {usernameError, passwordError} = validateSignInForm({
            username: this.state.username,
            password: this.state.password
        });
        this.setState({usernameError: usernameError, passwordError: passwordError});
        if (usernameError.length > 0 || passwordError.length > 0) {
            return;
        }
        const payload = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/users/signin/', payload)
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    AuthStore.saveAuthToken(response.data.token);
                    AuthStore.saveUser(payload.username);
                    this.props.history.push('/environments');
                }
            })
            .catch(err => {
                let errText = '';
                if (err.response.data['username']) {
                    errText = err.response.data['username'][0]
                } else if (err.response.data['password']) {
                    errText = err.response.data['password'][0];
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
            });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.loginContainer}>
                <h1 className={classes.header}>Log in</h1>
                <form className={classes.root} noValidate autoComplete={"on"}>
                    <TextField label={"Username"}
                               error={this.state.usernameError.length > 0}
                               helperText={this.state.usernameError}
                               onChange={(event => this.usernameChanged(event))}
                    />

                    <TextField label={"Password"}
                               error={this.state.passwordError.length > 0}
                               helperText={this.state.passwordError}
                               type={"password"}
                               onChange={(event => this.passwordChanged(event))}
                    />
                    <Button className={classes.button} variant="contained" color="primary" onClick={this.signIn}>
                        Sign In
                    </Button>
                    <Link className={classes.forgotPassword} to={'/reset-password-request'}>Forgot your password?</Link>
                </form>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(LoginForm));