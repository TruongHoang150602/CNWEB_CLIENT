// http-utils.ts
import Axios from "axios";

export const ENDPOINT =
  process.env.REACT_APP_BASE_URL || "https://quizzifyme.onrender.com";

export const sendRequest = (method, data) => {
  return new Promise((resolve, reject) => {
    Axios({
      baseURL: data.baseURL ?? ENDPOINT,
      url: data.url,
      method: method,
      data: method === "GET" ? undefined : data.params,
      params: method === "GET" ? data.params : undefined,
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.status);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const POST = (data) => sendRequest("POST", data);

export const GET = (data) => sendRequest("GET", data);

export const PUT = (data) => sendRequest("PUT", data);

export const DELETE = (data) => sendRequest("DELETE", data);
