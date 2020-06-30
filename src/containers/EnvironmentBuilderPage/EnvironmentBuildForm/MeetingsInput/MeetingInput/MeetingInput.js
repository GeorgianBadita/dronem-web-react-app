import React, {Component} from 'react';
import {TextField, withStyles} from "@material-ui/core";

const useStyles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
});

class MeetingInput extends Component {

    state = {
        r1Id: null,
        r2Id: null,
        firstTime: null
    }


    r1ChangedHandler = (event) => {
        const newR1 = parseInt(event.target.value, 10);
        const oldState = {...this.state};
        const newState = {...oldState, r1Id: newR1};
        this.setState({r1Id: newR1});
        this.props.changeHandler(oldState, newState);
    }


    r2ChangedHandler = (event) => {
        const newR2 = parseInt(event.target.value, 10);
        const oldState = {...this.state};
        const newState = {...oldState, r2Id: newR2};
        this.setState({r2Id: newR2});
        this.props.changeHandler(oldState, newState);
    }

    firstTimeChangedHandler = (event) => {
        const newfirstTime = parseInt(event.target.value, 10);
        const oldState = {...this.state};
        const newState = {...oldState, firstTime: newfirstTime};
        this.setState({firstTIme: newfirstTime});
        this.props.changeHandler(oldState, newState);
    }

    render() {
        return (
            <div>
                <TextField label={"R1_Id"} variant={"outlined"}
                           onChange={(event => this.r1ChangedHandler(event))}
                />
                <TextField label={"R2_Id"} variant={"outlined"}
                           onChange={(event => this.r2ChangedHandler(event))}
                />
                <TextField label={"First Time"} variant={"outlined"}
                           onChange={(event => this.firstTimeChangedHandler(event))}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(MeetingInput);