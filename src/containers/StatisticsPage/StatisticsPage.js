import React, {Component} from 'react';
import axios from '../../axios-config';
import Spinner from "../../components/UI/Spinner/Spinner";
import Statistics from "../../components/Statistics/Statistics";
import classes from './StatisticsPage.css';
import AuthStore from "../../auth/authStore";

class StatisticsPage extends Component {
    state = {
        statistics: null,
        loading: false
    }


    componentDidMount() {
        let name = this.props.match.params.name;
        if (name) {
            if (!this.state.statistics || (name !== this.state.envName)) {
                this.setState({loading: true});
                axios.get('/environment/stats/' + name, {headers: {Authorization: `Token ${AuthStore.getToken()}`}})
                    .then(response => {
                        let stats = [];
                        response.data.forEach(stat => {
                            stats.push(stat);
                        })
                        this.setState({statistics: stats, loading: false});
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    render() {
        return (
            <div className={classes.StatsPage}>
                <h1 className={classes.statisticsPageHeader}>Statistics for {this.props.match.params.name}</h1>
                {this.state.loading ? <Spinner/> : null}
                {this.state.statistics ? <Statistics stats={this.state.statistics}/> : null}
            </div>
        );
    }
}

export default StatisticsPage;