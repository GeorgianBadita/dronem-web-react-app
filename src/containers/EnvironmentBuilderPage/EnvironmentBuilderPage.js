import React, {Component} from 'react';
import EnvironmentBuildForm from "./EnvironmentBuildForm/EnvironmentBuildForm";
import classes from './EnvironmentBuilderPage.css';
class EnvironmentBuilderPage extends Component {

    render() {
        return (
            <div className={classes.EnvBuilder}>
                <EnvironmentBuildForm/>
            </div>
        );
    }
}

export default EnvironmentBuilderPage
