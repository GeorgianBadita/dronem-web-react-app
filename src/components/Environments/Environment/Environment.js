import React, {Component} from 'react';
import classes from './Environment.css';
import {withRouter} from "react-router-dom";
import axios from '../../../axios-config';
import FileDownload from 'js-file-download';
import {Grid} from '@material-ui/core';
import {Close} from '@material-ui/icons'
import AuthStore from "../../../auth/authStore";

class Environment extends Component {
    showStatisticsClick = () => {
        this.props.history.push('/environments/' + this.props.env.name)
    }

    handleQTableDownload = () => {
        axios.get('/environment/qtable/' + this.props.env.name + '/', {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then(response => {
                FileDownload(response.data, 'qtable.json');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Grid item className={classes.ConfigDocBox}>
                <div className={classes.ExplanationBox}>
                    <h4 className={classes.MacroName}>{this.props.env.name}</h4>

                    <div className={classes.InlineBoxLeft}>
                        <p className={classes.DefaultConf}>Number of robots:</p>
                        <p>{this.props.env.numRobots}</p>
                    </div>
                    <div className={classes.InlineBoxLeft}>
                        <p className={classes.DefaultConf}>Max Memory:</p>
                        <p>{this.props.env.maxMemory}</p>
                    </div>
                    <div className={classes.InlineBoxLeft}>
                        <p className={classes.DefaultConf}>Init Memory:</p>
                        <p>{this.props.env.initMemory}</p>
                    </div>
                    <div className={classes.InlineBoxLeft}>
                        <p className={classes.DefaultConf}>Num Meetings:</p>
                        <p>{this.props.env.numMeetings}</p>
                    </div>

                    <div className={classes.ButtonsContainer}>
                        <button  className={classes.CardButton}  onClick={() => this.showStatisticsClick()}>Show Statistics</button>
                        <button  className={classes.CardButton}  onClick={() => this.handleQTableDownload()}>Download Best QTable</button>
                    </div>
                    <Close className={classes.DeleteBtn} onClick={() => this.props.handleDelete(this.props.env.name)} />

                </div>
            </Grid>
        ); 
    }
}


export default withRouter(Environment);