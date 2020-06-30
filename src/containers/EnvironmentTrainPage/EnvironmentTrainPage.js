import React, {Component} from 'react';
import classes from './EnvironmentTrainPage.css'
import ConfigForm from "./TrainConfigForm/TrainConfigForm";
import DronemStats from "../../components/DronemStats/DronemStats";
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuthStore from "../../auth/authStore";
import {validateTrainingForm} from '../../validators/formValidators';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

class EnvironmentTrainPage extends Component {

    state = {
        envNames: [],
        completedForm: false,
        loading: false,
        errors: {
            env_nameError: "",
            epsilonError: "",
            min_epsilonError: "",
            epsilon_decayError: "",
            show_stats_everyError: "",
            learning_rateError: "",
            save_q_table_everyError: "",
            episodesError: "",
            discount_rateError: ""
        }
    }

    componentDidMount() {
        axios.get("/environment/names/", {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then(response => this.setState({envNames: response.data}))
            .catch(err => {
                console.log(err);
                this.setState({envNames: []})
            });
    }

    handleTrainFormCompleted = (formData) => {
        const {
            env_nameError, epsilonError, min_epsilonError, epsilon_decayError, discount_rateError,
            episodesError, save_q_table_everyError, learning_rateError, show_stats_everyError
        } = validateTrainingForm(formData);

        this.setState({
            errors: {
                env_nameError: env_nameError,
                epsilonError: epsilonError,
                min_epsilonError: min_epsilonError,
                epsilon_decayError: epsilon_decayError,
                discount_rateError: discount_rateError,
                episodesError: episodesError,
                save_q_table_everyError: save_q_table_everyError,
                learning_rateError: learning_rateError,
                show_stats_everyError: show_stats_everyError
            }
        });

        if (env_nameError.length > 0 || episodesError.length > 0 || min_epsilonError.length > 0 ||
            epsilonError.length > 0 || epsilon_decayError.length > 0 || discount_rateError.length > 0 ||
            save_q_table_everyError.length > 0 || learning_rateError.length > 0 || show_stats_everyError.length > 0) {
            return;
        }
        this.setState({loading: true});
        this.setState({completedForm: false});
        const payload = {
            env_name: formData.envName,
            epsilon: parseFloat(formData.epsilon),
            min_epsilon: parseFloat(formData.minEpsilon),
            epsilon_decay: parseFloat(formData.epsilonDecay),
            show_stats_every: parseInt(formData.showStatsEvery, 10),
            learning_rate: parseFloat(formData.learningRate),
            save_q_table_every: parseInt(formData.saveQTableEvery, 10),
            episodes: parseInt(formData.episodes, 10),
            discount_rate: parseFloat(formData.discountRate)

        }

        axios.post('/rl/train/', payload, {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then((response) => {
                this.setState({
                    completedForm: true,
                    loading: false
                });
            })
            .catch(err => {
                let errText = "";
                if (err.response.data['env_name']) {
                    errText = err.response.data['env_name'][0];
                } else if (err.response.data['epsilon']) {
                    errText = err.response.data['epsilon'][0];
                } else if (err.response.data['min_epsilon']) {
                    errText = err.response.data['min_epsilon'][0];
                } else if (err.response.data['epsilon_decay']) {
                    errText = err.response.data['epsilon_decay'][0];
                } else if (err.response.data['show_stats_every']) {
                    errText = err.response.data['show_stats_every'][0];
                } else if (err.response.data['learning_rate']) {
                    errText = err.response.data['learning_rate'][0];
                } else if (err.response.data['save_q_table_every']) {
                    errText = err.response.data['save_q_table_every'][0];
                } else if (err.response.data['discount_rate']) {
                    errText = err.response.data['discount_rate'][0];
                } else if (err.response.data['episodes']) {
                    errText = err.response.data['episodes'][0];
                } else {
                    errText = err.response.data['non_field_errors'][0];
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
                this.setState({loading: false, completedForm: false})
            });
    }


    render() {
        let graph = <DronemStats/>;
        let spinner = null;

        if (this.state.loading) {
            spinner = <Spinner/>
            graph = null;
        }
        return (
            <div className={classes.TrainContainer}>
                <ConfigForm envNames={this.state.envNames}
                            clicked={this.handleTrainFormCompleted}
                            formErrors={this.state.errors}
                />
                {graph}
                {spinner}
            </div>
        );
    }
}

export default EnvironmentTrainPage;