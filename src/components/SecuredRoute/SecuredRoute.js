import React from 'react';
import AuthStorage from '../../auth/authStore';
import {Redirect, Route} from 'react-router-dom';

const securedRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = AuthStorage.isAuthenticated();
    return (
        <Route
            {...rest}
            render={props => isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            )}
        />
    )
}

export default securedRoute;