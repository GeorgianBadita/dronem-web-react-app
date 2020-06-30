import React, {Component} from 'react';
import classes from './Statistic.css';
import {LineChart} from "react-chartkick";
import moment from 'moment'


class Statistic extends Component {

    convertToLineChartData = (data) => {
        let plotData = [
            {"name": "Average Reward", "data": {}},
            {"name": "Min Reward", "data": {}},
            {"name": "Max Reward", "data": {}}
        ];

        data.episodes.forEach((ep, index) => {
            plotData[0]["data"][ep] = data.avgs_rewards[index].toFixed(2);
            plotData[1]["data"][ep] = data.mins_rewards[index].toFixed(2);
            plotData[2]["data"][ep] = data.maxs_rewards[index].toFixed(2);
        });

        return plotData;
    }

    convertDate = (date) => {
        const dateSpl = date.split("T");
        return dateSpl[0];
    }

    convertTime = (date) => {
        const dateSpl = date.split("T");
        return dateSpl[1].split('.')[0]
    }

    render() {

        let plotData = this.convertToLineChartData(this.props.data);
        return (
            <div className={classes.Stat}>

                <div className={classes.TimeContainer}>{moment(this.props.data.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                <LineChart xtitle={"Episode"} ytitle={"Reward"} data={plotData}/>
            </div>
        );
    }
}

export default Statistic;
