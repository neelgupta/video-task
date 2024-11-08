import axios from "axios";
import { getHeaderData } from "../utils/helpers";
const baseURL = "https://video-ask-api.vercel.app/api/v1/";
export const api = {
  header: () => {
    const header = getHeaderData();
    return header;
  },
  get: (url, header = {}) => {
    let headers = api.header();
    headers = { ...headers, ...header };
    return new Promise((resolve, reject) => {
      axios
        .get(baseURL + url, {
          headers,
        })
        .then((res) => {
          let customResponse = {
            status: res.status,
            data: res?.data || null,
          };
          resolve(customResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post: (url, data, header = {}) => {
    console.log("baseURL", baseURL);
    let headers = api.header();
    headers = { ...headers, ...header };
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + url, data, {
          headers,
        })
        .then((res) => {
          let customResponse = {
            status: res.status,
            data: res?.data || null,
          };
          resolve(customResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete: (url, data, header = {}) => {
    let headers = api.header();
    headers = { ...headers, ...header };
    return new Promise((resolve, reject) => {
      axios
        .delete(baseURL + url, {
          headers,
          data,
        })
        .then((res) => {
          let customResponse = {
            status: res.status,
            data: res?.data || null,
          };
          resolve(customResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  put: (url, data, header = {}) => {
    let headers = api.header();
    headers = { ...headers, ...header };
    return new Promise((resolve, reject) => {
      axios
        .put(baseURL + url, data, {
          headers,
        })
        .then((res) => {
          let customResponse = {
            status: res.status,
            data: res?.data || null,
          };
          resolve(customResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
