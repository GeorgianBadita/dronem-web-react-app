import React, {Component} from 'react';
import {Button, TextField, withStyles} from "@material-ui/core";
import {useStyles} from "../../constants";


class PasswordResetConfirmForm extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <h1 className={classes.header}>Change Password</h1>
                    <form className={classes.root} noValidate autoComplete={"on"}>
                        <TextField
                            label={"New password"}
                            type={"password"}
                            error={this.props.errors.passwordError.length > 0}
                            helperText={this.props.errors.passwordError}
                        />
                        <TextField
                            label={"Repeat password"}
                            type={"password"}
                            error={this.props.errors.passwordConfirmError.length > 0}
                            helperText={this.props.errors.passwordConfirmError}
                            onChange={(event => this.props.onNewPasswordChangedRepeat(event))}
                        />
                        <Button className={classes.button} variant="contained" color="primary"
                                onClick={() => this.props.onPasswordChangeClick()}>
                            Reset Password
                        </Button>

                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(PasswordResetConfirmForm);