import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
        "min-width": "435px",
        "max-width": "435px",
        height: "550px",
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    button: {
        "&:hover": {backgroundColor: "#4267b2"},
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#4267b2",
        padding: "5px 40px",
        marginTop: "10%",

    },
});

const defaultTrainConfig = {
    envName: null,
    episodes: 550,
    epsilon: 1,
    minEpsilon: 0.0005,
    epsilonDecay: 0.99989,
    showStatsEvery: 50,
    discountRate: 0.9,
    learningRate: 0.1,
    saveQTableEvery: 10000,
};

class TrainConfigForm extends Component {
    state = defaultTrainConfig;

    envNameChanged = (value) => {
        if (this.props.envNames) {
            const newModelName = value;
            this.setState({envName: newModelName});
        }
    };

    episodesChanged = (event) => {
        const newEpisodes = event.target.value;
        this.setState({episodes: newEpisodes});
    };

    epsilonChanged = (event) => {
        const newEpsilon = event.target.value;
        this.setState({epsilon: newEpsilon});
    };

    minEpsilonChanged = (event) => {
        const newMinEpsilon = event.target.value;
        this.setState({minEpsilon: newMinEpsilon});
    };

    epsilonDecayChanged = (event) => {
        const newEpsilonDecay = event.target.value;
        this.setState({epsilonDecay: newEpsilonDecay});
    };

    showStatsEveryChanged = (event) => {
        const newShowStatsEvery = event.target.value;
        this.setState({showStatsEvery: newShowStatsEvery});
    };

    discountRateChanged = (event) => {
        const newDiscountRate = event.target.value;
        this.setState({discountRate: newDiscountRate});
    };

    learningRateChanged = (event) => {
        const newLearningRate = event.target.value;
        this.setState({learningRate: newLearningRate});
    };

    saveQTableEveryChanged = (event) => {
        const newSaveQTableEvery = event.target.value;
        this.setState({saveQTableEvery: newSaveQTableEvery});
    };

    render() {
        const {classes} = this.props;
        const trainingForm = (
            <div>
                <TextField
                    label={"Episodes"}
                    error={this.props.formErrors.episodesError.length > 0}
                    helperText={this.props.formErrors.episodesError}
                    defaultValue={550}
                    onChange={(event) => this.episodesChanged(event)}
                />
                <TextField
                    label={"Epsilon"}
                    error={this.props.formErrors.epsilonError.length > 0}
                    helperText={this.props.formErrors.epsilonError}
                    defaultValue={1}
                    onChange={(event) => this.epsilonChanged(event)}
                />
                <TextField
                    label={"Min Epsilon"}
                    error={this.props.formErrors.min_epsilonError.length > 0}
                    helperText={this.props.formErrors.min_epsilonError}
                    defaultValue={0.0005}
                    onChange={(event) => this.minEpsilonChanged(event)}
                />
                <TextField
                    label={"Epsilon Decay"}
                    error={this.props.formErrors.epsilon_decayError.length > 0}
                    helperText={this.props.formErrors.epsilon_decayError}
                    defaultValue={0.99989}
                    onChange={(event) => this.epsilonDecayChanged(event)}
                />
                <TextField
                    label={"Show Stats Every"}
                    error={this.props.formErrors.show_stats_everyError.length > 0}
                    helperText={this.props.formErrors.show_stats_everyError}
                    defaultValue={50}
                    onChange={(event) => this.showStatsEveryChanged(event)}
                />
                <TextField
                    label={"Discount Rate"}
                    error={this.props.formErrors.discount_rateError.length > 0}
                    helperText={this.props.formErrors.discount_rateError}
                    defaultValue={0.9}
                    onChange={(event) => this.discountRateChanged(event)}
                />
                <TextField
                    label={"Learning Rate"}
                    error={this.props.formErrors.learning_rateError.length > 0}
                    helperText={this.props.formErrors.learning_rateError}
                    defaultValue={0.1}
                    onChange={(event) => this.learningRateChanged(event)}
                />
                <TextField
                    label={"Save QTable Every"}
                    error={this.props.formErrors.save_q_table_everyError.length > 0}
                    helperText={this.props.formErrors.save_q_table_everyError}
                    defaultValue={10000}
                    onChange={(event) => this.saveQTableEveryChanged(event)}
                />
            </div>
        );

        return (
            <form className={classes.root} noValidate autoComplete={"on"}>
                <Autocomplete
                    onChange={(_, value) => this.envNameChanged(value)}
                    renderInput={(params) => (
                        <TextField
                            label={"Environment"} {...params} variant={"outlined"}
                            error={this.props.formErrors.env_nameError.length > 0}
                            helperText={this.props.formErrors.env_nameError}
                        />
                    )}
                    getOptionLabel={(option) => option}
                    style={{width: "100%"}}
                    options={this.props.envNames}
                />
                {trainingForm}
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.clicked(this.state)}
                >
                    Train
                </Button>
            </form>
        );
    }
}

export default withStyles(useStyles)(TrainConfigForm);
