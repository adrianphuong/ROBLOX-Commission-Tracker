import axios from 'axios'

const baseURL = "localhost:10000/api"

const addCommission = (client, setText, setComm) => {
    axios
    .post(`${baseURL}/save`)
}