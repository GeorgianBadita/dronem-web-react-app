import React, {Component} from "react";
import {Button, TextField, withStyles, Grid} from "@material-ui/core";
import axios from "./../../../axios-config";
import RobotsInput from "./RobotsInput/RobotsInput";
import MeetingsInput from "./MeetingsInput/MeetingsInput";
import AuthStore from "../../../auth/authStore";
import 'react-toastify/dist/ReactToastify.min.css'
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";

const useStyles = (theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
        },
        display: "flex",
        flexDirection: "column",
        width: "550px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        marginTop: "10%",
        padding: "20px",
        marginBottom: '50px'
    },
    formWide: {
        width: '700px'
    },
    button: {
        "&:hover": {backgroundColor: "#4267b2"},
        width: '250px',
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#4267b2",
        padding: "5px 40px",
        marginTop: "10%",
    },
    addCsvButton: {
        marginTop: '10px',
        pointerEvents: 'none',
    },
    inputHidden: {
        display: 'none'
    }
});

class EnvironmentBuildForm extends Component {
    state = {
        uploaded: false,
        file: null,
        step: 1,
        name: null,
        num_robots: null,
        max_memory: null,
        num_meetings: null,
        init_memory: null,
        robots: [],
        meetings: [],
    };

    envNameChanged = (event) => {
        const newEnvName = event.target.value;
        this.setState({name: newEnvName});
    };

    numOfRobotsChanged = (event) => {
        const newNumOfRobots = parseInt(event.target.value, 10);
        this.setState({num_robots: newNumOfRobots});
    };

    maxMemoryChanged = (event) => {
        const newMaxMemory = parseInt(event.target.value, 10);
        this.setState({max_memory: newMaxMemory});
    };

    initMemoryChanged = (event) => {
        const newInitMemory = parseInt(event.target.value, 10);
        this.setState({init_memory: newInitMemory});
    };

    numOfMeetingsChanged = (event) => {
        const newNumOfMeetings = parseInt(event.target.value, 10);
        this.setState({num_meetings: newNumOfMeetings});
    };

    cycleChanged = (event, robotNumber) => {
        const newCycle = "[" + event.target.value + "]";
        const currentRobots = [...this.state.robots];
        let found = false;
        currentRobots.forEach((robot) => {
            if (robot.r_id === robotNumber) {
                robot.r_id = robotNumber;
                robot.cycle = newCycle;
                found = true;
            }
        });
        if (!found) {
            currentRobots.push({
                r_id: robotNumber,
                cycle: newCycle,
            });
        }
        this.setState({robots: currentRobots});
    };

    meetingInputChangeHandler = (oldInputState, newInputState) => {
        let found = false;
        const currentMeetings = [...this.state.meetings];
        currentMeetings.forEach((meeting) => {
            if (
                meeting.robot1 === oldInputState.r1Id &&
                meeting.robot2 === oldInputState.r2Id
            ) {
                meeting.robot1 = newInputState.r1Id;
                meeting.robot2 = newInputState.r2Id;
                meeting.first_time = newInputState.firstTime;
                found = true;
            }
        });
        if (!found) {
            currentMeetings.push({
                robot1: newInputState.r1Id,
                robot2: newInputState.r2Id,
                first_time: newInputState.firstTime,
            });
        }

        this.setState({meetings: currentMeetings});
    };

    addEnvironmentHandler = () => {
        const payload = {...this.state};
        console.log(payload)
        axios
            .post("/environments/", payload, {
                headers: {Authorization: `Token ${AuthStore.getToken()}`},
            })
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Environment added successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.props.history.push('/environments');
                }
            })
            .catch((err) => console.log(err));
    };

    renderFormFields = () => {
        const {step} = this.state;
        switch (step) {
            case 1:
                return (
                    <Grid container justify='center'>
                        <TextField
                            label={"Name"}
                            variant={"outlined"}
                            onChange={(event) => this.envNameChanged(event)}
                        />
                        <TextField
                            label={"Number of Robots"}
                            variant={"outlined"}
                            onChange={(event) => this.numOfRobotsChanged(event)}
                        />
                        <TextField
                            label={"Number of Meetings"}
                            variant={"outlined"}
                            onChange={(event) => this.numOfMeetingsChanged(event)}
                        />
                        <TextField
                            label={"Maximum Memory"}
                            variant={"outlined"}
                            onChange={(event) => this.maxMemoryChanged(event)}
                        />
                        <TextField
                            label={"Initial Memory"}
                            variant={"outlined"}
                            onChange={(event) => this.initMemoryChanged(event)}
                        />
                    </Grid>
                );
            case 2:
                return (
                    <Grid container justify='center'>

                        <RobotsInput
                            numInputs={this.state.num_robots}
                            cycleChanged={this.cycleChanged}
                        />
                    </Grid>
                );
            case 3:
                return (
                    <MeetingsInput
                        numInputs={this.state.num_meetings}
                        inputChangeHandler={this.meetingInputChangeHandler}
                    />
                );
            default:
                return null;
        }
    };

    getHeaderText = () => {
        if (this.state.uploaded) {
            return "Upload JSON environment"
        }
        const {step} = this.state;
        switch (step) {
            case 1:
                return 'General information'
            case 2:
                return "Robot's cycles"
            case 3:
                return "Robot's meetings"
            default:
                return null;
        }
    }

    nextStep = () => {
        this.setState((state) => ({...state, step: state.step + 1}));
    };

    handleUpload = (e) => {
        this.setState({uploaded: true, file: e.target.files[0]});
    }

    sendFileToServer = () => {
        const formData = new FormData();
        formData.append('file', this.state.file, this.state.file.name);

        axios.put('/environment/upload/' + this.state.file.name, formData, {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
            .then(res => {
                if (res.status === 201) {
                    toast.success("Environment added successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.props.history.push('/environments');
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const {classes} = this.props;
        const {step} = this.state;
        return (
            <form className={`${classes.root} ${step === 3 ? classes.formWide : ''}`} noValidate autoComplete={"on"}>
                <h1>{this.getHeaderText()}</h1>
                {!this.state.uploaded ? this.renderFormFields() : null}
                {!this.state.uploaded ? <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={step === 3 ? this.addEnvironmentHandler : this.nextStep}
                >
                    {step === 3 ? "Add Environment" : "Next Step"}
                </Button> : <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => this.sendFileToServer()}
                >
                    Add Environment
                </Button>
                }

                {step === 1 && !this.state.uploaded && (
                    <React.Fragment>
                        <input className={classes.inputHidden} type='file' accept='.json' id='csv-input'
                               onChange={(e) => this.handleUpload(e)}/>
                        <label htmlFor='csv-input'>
                            <Button
                                className={`${classes.button} ${classes.addCsvButton}`}
                                variant="contained"
                                color="primary"
                            >
                                Add from JSON
                            </Button>
                        </label>
                    </React.Fragment>

                )}
            </form>
        );
    }
}

export default withRouter(withStyles(useStyles)(EnvironmentBuildForm));
