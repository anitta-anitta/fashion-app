import axios from "axios";

export default axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        Accept: 'application/json'
    }
})