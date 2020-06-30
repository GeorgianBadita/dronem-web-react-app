import React, {Component} from 'react';
import Environment from "../../components/Environments/Environment/Environment";
import {Grid, withStyles} from '@material-ui/core';

const styles = () => ({
    base: {
        width: '80%',
        justifyContent: 'center'
    }
})

class Environments extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={5} className={classes.base}>
                {
                    this.props.envs.map((env) => {
                        return (
                            <Environment handleDelete={this.props.deleteEnvHandler} env={env} key={env.name}/>
                        )
                    })
                }
            </Grid>
        );
    }
}

export default withStyles(styles)(Environments)
