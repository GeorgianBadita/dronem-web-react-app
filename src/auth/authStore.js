class AuthStore {

    saveAuthToken = (token) => {
        localStorage.setItem("token", token);
    }

    saveUser = (username) => {
        localStorage.setItem("username", username);
    }

    isAuthenticated = () => {
        return localStorage.getItem("token") !== null;
    }

    getToken = () => {
        return localStorage.getItem("token");
    }

    getUser = () => {
        return localStorage.getItem("username")
    }

    removeToken() {
        localStorage.removeItem("token");
    }

    removeUser(){
        localStorage.removeItem("username");
    }

    clearStorage(){
        localStorage.clear();
    }
}

export default new AuthStore();