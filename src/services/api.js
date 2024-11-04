import axios from "axios";
import { getHeaderData } from "../utils/helpers";
const baseURL = "http://34.171.189.84:8080/admin";
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
        .delete("http://34.171.189.84:8080/admin" + url, {
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
        .put("http://34.171.189.84:8080/admin" + url, data, {
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
