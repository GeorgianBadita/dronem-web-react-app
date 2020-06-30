import React from 'react';
import AuthStorage from '../../auth/authStore';
import {Redirect, Route} from 'react-router-dom';

const redirectLoggedInRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = AuthStorage.isAuthenticated();
    return (
        <Route
            {...rest}
            render={props => !isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            )}
        />
    )
}

export default redirectLoggedInRoute;