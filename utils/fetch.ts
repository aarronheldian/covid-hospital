import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const defaultError = {
  code: 500,
  status: "error",
  message: "Failed to fetch data. Please contact developer.",
};

interface FetchOptions extends AxiosRequestConfig {}

const fetch = <T = any>(opt: FetchOptions): Promise<T> => {
  const options: AxiosRequestConfig = {
    baseURL: "https://dekontaminasi.com",
    ...opt,
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        if (!err.response || !err.response.data) {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
};

export default fetch;
