import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8800/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getTodoList = () => {
    return axios.get(API_URL + "todo", { headers: authHeader() });
};

// в оригинале - доступ в зависимости от роли пользователя, буду делать попозже
// const getModeratorBoard = () => {
//     return axios.get(API_URL + "mod", { headers: authHeader() });
// };
//
// const getAdminBoard = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
// };

const UserService = {
    getPublicContent,
    getTodoList: getTodoList,
    // getModeratorBoard,
    // getAdminBoard,
};

export default UserService;