import axios from 'axios';
//api url
export default axios.create({
    baseURL: 'https://ca1-backend-jade-r-k.vercel.app/api'
});