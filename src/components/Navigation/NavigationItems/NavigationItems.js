import React, {Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import AuthStorage from '../../../auth/authStore';
import {withRouter} from 'react-router-dom';
import axios from '../../../axios-config';
import AuthStore from "../../../auth/authStore";
import Aux from "../../../hoc/Aux/Aux";


class NavigationItems extends Component {

    signOut = () => {
        axios.post('/users/signout/', {}, {headers: {Authorization: `Token ${AuthStore.getToken()}`}});
        AuthStorage.removeToken();
        AuthStorage.removeUser();
        AuthStorage.clearStorage();
        this.props.history.push('/login');
    }

    render() {
        const isLoggedIn = AuthStorage.isAuthenticated();
        //console.log(isLoggedIn);
        return (
            <div className={classes.NavigationItems}>
                <NavigationItem link={"/"}>
                    Home
                </NavigationItem>
                {isLoggedIn && (
                    <Aux>
                        <NavigationItem link={"/add-environment"}>
                            Add Environment
                        </NavigationItem>

                        <NavigationItem link={"/train-environments"}>
                            Train Environment
                        </NavigationItem>
                        <NavigationItem link={"/environments"}>
                            Environments
                        </NavigationItem>
                    </Aux>
                )

                }
                {!isLoggedIn ?
                    <NavigationItem link={"/login"}>
                        Login
                    </NavigationItem> : null
                }
                {!isLoggedIn ?
                    <NavigationItem link={"/signup"}>
                        Register
                    </NavigationItem> :
                    <NavigationItem link={"/login"} onClick={this.signOut}>
                        Sign out
                    </NavigationItem>
                }
            </div>
        );
    }
}

export default withRouter(NavigationItems);