import React, {Component} from 'react';
import {LineChart} from 'react-chartkick';
import AuthStore from '../../auth/authStore';
import 'chart.js';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import {ws_url} from "../../constants";

const defaultData = [
    {"name": "Average Reward", "data": {}},
    {"name": "Min Reward", "data": {}},
    {"name": "Max Reward", "data": {}}
];


class DronemStats extends Component {
    _mounted = false;
    state = {
        data: [...defaultData]
    }

    onWebSocketMessage(message) {
        try {
            const msg_json = JSON.parse(message);
            const new_data = msg_json['data'];
            const currentData = [...this.state.data];
            const episodeIndex = new_data['ep'];
            const avgReward = new_data['avg'];
            const maxReward = new_data['max'];
            const minReward = new_data['min'];
            currentData[0] = {...currentData[0]};
            currentData[0]["data"] = {...currentData[0]["data"]};
            currentData[0]["data"][episodeIndex] = avgReward.toFixed(2);
            currentData[1] = {...currentData[1]};
            currentData[1]["data"] = {...currentData[1]["data"]};
            currentData[1]["data"][episodeIndex] = minReward.toFixed(2);
            currentData[2] = {...currentData[2]};
            currentData[2]["data"] = {...currentData[2]["data"]};
            currentData[2]["data"][episodeIndex] = maxReward.toFixed(2);

            this.setState({data: currentData});
        } catch (error) {
            toast.error("Sorry, something went wrong!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //console.log("Error: ", error)
        }
    }

    componentDidMount() {
        this._mounted = true;
        const username = AuthStore.getUser();
        this.startWebSocket(username);
    }

    componentWillUnmount() {
        this._mounted = false;
        this.stopWebSocket(this.state.ws)
    }

    startWebSocket(groupId) {
        let ws = new WebSocket(ws_url + groupId + "/");

        ws.onopen = () => {
            //console.log("ws connected on " + groupId)
        };

        ws.onmessage = (event) => {
            //console.log("ws message");
            this.onWebSocketMessage(event.data)
        };

        // ws.onclose = () => {
        //     console.log('ws disconnected')
        // };
        this.setState({ws: ws, data: [...defaultData]});
    }

    stopWebSocket = (ws) => {
        ws.close();
        //console.log("ws closed");
        this.setState({ws: null});
    }

    render() {
        return (

            <LineChart xtitle={"Episode"} ytitle={"Reward"} height='600px' data={this.state.data}/>

        );
    }
}

export default DronemStats;