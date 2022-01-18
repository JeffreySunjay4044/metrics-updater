const axios = require("axios");
const http = require("http");

class HttpAdapter {

    /**
     * Use this method to make http call using axios
     * @param {string} path - The URL where you need to make request to
     * @param {string} method - The method in REST call eg. GET, POST
     * @param {object} headers - The headers
     * @param {object} params - The query parameters
     * @param {object} data - The body in POST, PUT, PATCH
     * @param {number} timeout - The timout in millisecond
     * @returns {Promise<*>}
     */
    makeRequest (path, method, headers, params, data, timeout = process.env.ACTIVE_ENV === 'PRODUCTION' ? 250 : 1000) {
        const cancelTokenTimeout = timeout ? timeout : 500;
        const config = {
            url: path,
            method,
            timeout,
            headers,
            params,
            data,
            httpAgent: new http.Agent({ keepAlive: true }),
            cancelToken: new axios.CancelToken((c) => {
                setTimeout(() => {
                    return c(`Request Timeout from ${path}`);
                }, cancelTokenTimeout);
            })
        };
        return axios(config).then((response) => {
            return response;
        }).catch((err) => {
            if (err.response) {
                err.code = err.response.status;
                err.body = err.response.data;
            }
            if (err.config && err.config.url) {
                err.url = err.config.url;
            }
            delete err.config;
            delete err.request;
            throw err;
        });
    }
}
module.exports=HttpAdapter
