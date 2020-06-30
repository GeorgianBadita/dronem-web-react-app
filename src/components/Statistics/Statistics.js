import React from 'react';
import classes from './Statistics.css';
import Statistic from "./Statistic/Statistic";

const statistics = (props) => {
    return (
         <div className={classes.StatsList}>
             {
                 props.stats.map((stat, i) => {
                     return <Statistic data={stat} key={i}/>
                 })
             }
        </div>
    );
};

export default statistics;