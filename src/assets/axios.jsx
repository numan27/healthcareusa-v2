import axios from 'axios';

let showLoaderCallback = null;
let hideLoaderCallback = null;

export const setLoaderCallbacks = (showCallback, hideCallback) => {
    showLoaderCallback = showCallback;
    hideLoaderCallback = hideCallback;
};
// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        showLoaderCallback();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        hideLoaderCallback();
        return response;
    },
    function (error) {
        hideLoaderCallback();
        return Promise.reject(error);
    }
);

export default axios;
