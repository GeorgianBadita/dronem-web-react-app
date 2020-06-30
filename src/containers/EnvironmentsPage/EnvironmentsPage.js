import React, {Component} from 'react';
import classesCss from "./EnvironmentsPage.css";
import Environments from "../../components/Environments/Environments";
import axios from '../../axios-config';
import Spinner from "../../components/UI/Spinner/Spinner";
import AuthStore from '../../auth/authStore';
import {Button, withStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {withRouter} from "react-router-dom";

const useStyles = () => ({
    button: {
        '&:hover': {backgroundColor: '#4267b2'},
        "fontSize": "20px",
        "fontWeight": "bold",
        "backgroundColor": "#4267b2",
        "padding": "5px 40px",
        margin: '40px 0'
    },
    search: {position: 'absolute', left: 'calc(70%)', margin: '35px 0'}

});

class EnvironmentsPage extends Component {
    state = {
        viewMode: true,
        environments: [],
        filteredListEnvs: [],
        loading: false,
        showAddEnvBtn: true,
    }

    componentDidMount() {
        this.retrieveEnvironments();
    }

    retrieveEnvironments = () => {
        this.setState({loading: true});
        let envs = [];
        axios.get("/environments/", {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then(response => {
                response.data.forEach(environment => {
                    envs.push({
                        name: environment.name,
                        numRobots: environment.num_robots,
                        numMeetings: environment.meetings.length,
                        maxMemory: environment.max_memory,
                        initMemory: environment.init_memory,
                    });
                });
                this.setState({environments: envs, filteredListEnvs: envs, loading: false});
            })
            .catch(err => console.log(err));
    }

    deleteEnvironment = (envName) => {
        axios.delete('/environments/' + envName + '/', {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then(response => {
                if (response.status === 204) {
                    this.retrieveEnvironments();
                }
            })
            .catch(err => console.log(err));
    }

    addEnvironmentHandler = () => {
        this.props.history.push('/add-environment');
    }


    filterEnvs = (event) => {
        const envSearched = event.target.value;
        const allEnvs = [...this.state.environments];
        let filteredEnvs = [];
        allEnvs.forEach(elem => {
            if (elem.name.includes(envSearched)) {
                filteredEnvs.push(elem);
            }
        });

        this.setState({filteredListEnvs: filteredEnvs});
    }

    render() {

        const {classes} = this.props;
        return (
            <div className={classesCss.EnvPage}>
                {this.state.showAddEnvBtn === true ?
                    (<React.Fragment>
                            <Button className={classes.button} variant="contained" color="primary"
                                    onClick={this.addEnvironmentHandler}>
                                Add environment
                            </Button>
                            <TextField
                                onChange={(event) => this.filterEnvs(event)}
                                className={classes.search}
                                label="Search Environment"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }}/>
                        </React.Fragment>
                    ) : null}
                {this.state.loading ? <Spinner/> :
                    <Environments deleteEnvHandler={this.deleteEnvironment} envs={this.state.filteredListEnvs}/>}
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(EnvironmentsPage))
