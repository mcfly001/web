import axios from "axios";

const request = function(url, options = {}, method = "get") {
  let key = ~["delete", "get", "head"].indexOf(method) ? "params" : "data";
  return new Promise((resolve, reject) => {
    axios(Object.assign({ url, method, timeout: 3600 }, { [key]: options }))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default request;
