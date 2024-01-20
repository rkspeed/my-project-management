import axios  from "axios";

export default axios.create({
    baseURL:'https://deffect-management-application-default-rtdb.firebaseio.com/'
})