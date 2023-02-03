import axios from "axios";

const API_URL = "http://localhost:8800/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (userEmail, userPassword) => {
    return axios
        .post(API_URL + "user", {
            userEmail,
            userPassword,
        })
        .then((response) => {
            console.log(response.data)
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    };

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;