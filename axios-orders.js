import axios from "axios";

const instance = axios.create({
    baseURL : 'https://react-my-burger-7fa95-default-rtdb.firebaseio.com/'
});

export default instance;