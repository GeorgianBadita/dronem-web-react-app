import React, {Component} from 'react';
import {Button, TextField, withStyles} from "@material-ui/core";
import {useStyles} from "../../constants";


class PasswordResetRequestForm extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <h1 className={classes.header}>Reset Password</h1>
                <form className={classes.root} noValidate autoComplete={"on"}>
                    <TextField label={"Email"}
                               error={this.props.error.length > 0}
                               helperText={this.props.error}
                               onChange={(event => this.props.emailChanged(event))}
                    />
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => this.props.sendBtnClicked()}>
                        Send email
                    </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(PasswordResetRequestForm);
