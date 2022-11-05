import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import DronemRL from "./containers/DronemRL/DronemRL";
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <DronemRL/>
                </Layout>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>

        );
    }
}

export default App;
