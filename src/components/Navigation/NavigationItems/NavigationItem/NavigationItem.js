import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';
const navigationItem = (props) => (
        <NavLink
        {...props} className={classes.NavigationItem}
            isActive={(match) => match && match.url.startsWith(props.link)}
            to={props.link}
            activeStyle={{
                fontWeight: "bold",
                color: "#20639",
                borderBottom: "7px solid #202020",
                height: "100%",
                outline: "none"
            }}
        >
            {props.children}
        </NavLink>
);

export default navigationItem;