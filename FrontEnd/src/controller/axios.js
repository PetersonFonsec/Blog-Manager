import axios from 'axios'
import { baseURL } from "@/global";

const client = axios.create({
    baseURL,
    timeout: 5000,
})

export default client