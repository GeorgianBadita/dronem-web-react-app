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

class RobotsInput extends Component {
    render() {
        return (
            [...Array(this.props.numInputs).keys()]
                .map(elem => {
                    return (
                        <div key={elem}>
                            <TextField label={"Robot's " + elem} variant={"outlined"}
                                       onChange={(event => this.props.cycleChanged(event, elem))}
                            />
                        </div>)
                })
        )
    }
}

export default withStyles(useStyles)(RobotsInput);