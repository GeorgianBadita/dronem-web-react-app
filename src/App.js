import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import DronemRL from "./containers/DronemRL/DronemRL";
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';


class App extends Component {
    // componentDidMount() {
    //   const payload = {
    //       username: 'geobadita',
    //       email: 'geo.badita@gmail.com',
    //       password: 'qwertyuiop'
    //   }
    //   axios.post('api/users/signup/', payload)
    //       .then(response => console.log(response))
    //       .then(err => console.log(err));
    // }
    // <div className={classes.App}>
    // {/*<DronemStats/>*/}
    //
    // </div>


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
