import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import EnvironmentTrainPage from "../EnvironmentTrainPage/EnvironmentTrainPage";
import {Redirect, Switch} from "react-router-dom";
import SecuredRoute from "../../components/SecuredRoute/SecuredRoute";
import RedirectLoggedInRoute from "../../components/RedirectLoggedInRoute/RedirectLoggedInRoute";
import EnvironmentsPage from "../EnvironmentsPage/EnvironmentsPage";
import StatisticsPage from "../StatisticsPage/StatisticsPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import PasswordResetRequestPage from "../PasswordResetRequestPage/PasswordResetRequestPage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";
import EnvironmentBuilderPage from "../EnvironmentBuilderPage/EnvironmentBuilderPage";


//WILL DO ROUTING HERE
class DronemRL extends Component {

    render() {
        return (
            <Aux>
                <Switch>
                    <SecuredRoute path={"/add-environment"} exact component={EnvironmentBuilderPage}/>
                    <SecuredRoute path={"/environments"} exact component={EnvironmentsPage}/>
                    <SecuredRoute path={"/train-environments"} exact component={EnvironmentTrainPage}/>
                    <SecuredRoute path={"/environments/:name"} exact component={StatisticsPage}/>
                    <RedirectLoggedInRoute path={"/login"} exact component={LoginPage}/>
                    <RedirectLoggedInRoute path={"/signup"} exact component={RegisterPage}/>
                    <RedirectLoggedInRoute path={"/reset-password-request"} exact component={PasswordResetRequestPage}/>
                    <RedirectLoggedInRoute path={"/reset-password/:token"} exact component={ResetPasswordPage}/>
                </Switch>

            </Aux>
        )
    }
}

export default DronemRL;