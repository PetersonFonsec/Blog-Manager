import axios from 'axios'
import { baseURL } from "@/global";

const client = axios.create({
    baseURL,
})

export default client