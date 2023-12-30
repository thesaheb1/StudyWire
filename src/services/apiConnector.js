import axios from "axios";

export const axionInstance = axios.create({});

export const apiConnector = (method, url, body, header, params) => {

    return axionInstance({
        method:method,
        url:url,
        data:body ? body : null,
        headers:header ? header : null,
        params:params ? params : null
    })
}