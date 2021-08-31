import axios from "axios";

const api_DNS = "http://192.168.43.20:8000"; //ge
// const api_DNS = "http://192.168.43.187:8000"; //hy8
// const api_DNS = "http://172.20.10.3:8000";//green
// const api_DNS = "http://207.154.213.244:8000";//server
const api_version = "/api/b1";

export const get_DNS = () => {
  return api_DNS;
};

export const axios_Prom = async (type, api_router, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      let result;
      if (type === "POST") {
        result = await axios.post(api, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "accessToken " + accessToken,
          },
        });
      } else if (type === "PUT") {
        result = await axios.put(api, formData, {
          headers: {
            "content-type": "application/json",
            authorization: "accessToken " + accessToken,
          },
        });
      }
      console.log(result);
      if (!result.data.status) return reject(result.data);

      return resolve(result.data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

//post
const fetchPost_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;

      const resPromise = await fetch(api, {
        body: JSON.stringify(bodyObj),
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + accessToken,
        },
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });

      const result = await resPromise.json();

      resolve(result);
    } catch (error) {
      console.log(error);
      reject({ message: "fetchPost_Prom error", error });
    }
  });
};

const post_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetchPost_Prom(api_router, bodyObj);
      if (result.status === 401) {
        result = await refreshToken_Prom();
        if (result.status === 200) {
          result = await fetchPost_Prom(api_router, bodyObj);
        } else {
          result = {
            status: 400,
            message: "您的Token已经过期, 请使用账号密码登陆",
          };
        }
      }
      resolve(result);
    } catch (error) {
      console.log(error);
      reject({ status: 400, message: "错误" });
    }
  });
};

const fetchPostFile_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      const resPromise = await fetch(api, {
        body: bodyObj,
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + accessToken,
        },
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
        mimeType: "multipart/form-data",
        dataType: "json",
        async: false,
        contentType: false,
        processData: false,
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      reject({ message: "fetchPostFile_Prom error", error });
    }
  });
};

const postFile_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetchPostFile_Prom(api_router, bodyObj);
      if (result.status === 401) {
        result = await refreshToken_Prom();
        if (result.status === 200) {
          result = await fetchPostFile_Prom(api_router, bodyObj);
        } else {
          result = {
            status: 400,
            message: "您的Token已经过期, 请使用账号密码登陆",
          };
        }
      }
      resolve(result);
    } catch (error) {
      reject({ status: 400, message: "错误" });
    }
  });
};

//put
const fetchPut_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;

      const resPromise = await fetch(api, {
        body: JSON.stringify(bodyObj),
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + accessToken,
        },
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      reject({ message: "fetchPut_Prom error", error });
    }
  });
};

const put_Prom = (api_router, bodyObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetchPut_Prom(api_router, bodyObj);
      if (result.status === 401) {
        result = await refreshToken_Prom();
        if (result.status === 200) {
          result = await fetchPut_Prom(api_router, bodyObj);
        } else {
          result = {
            status: 400,
            message: "您的Token已经过期, 请使用账号密码登陆",
          };
        }
      }
      resolve(result);
    } catch (error) {
      reject({ status: 400, message: "错误" });
    }
  });
};

//get
const fetchGet_Prom = (api_router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      console.log(api_router);
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      console.log(error);
      reject({ message: "fetchGet_Prom error", error });
    }
  });
};

const get_Prom = (api_router) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetchGet_Prom(api_router);
      if (result.status === 401) {
        result = await refreshToken_Prom();
        if (result.status === 200) {
          result = await fetchGet_Prom(api_router);
        } else {
          result = {
            status: 400,
            message: "您的Token已经过期, 请使用账号密码登陆",
          };
        }
      }
      resolve(result);
    } catch (error) {
      reject({ status: 400, message: "错误" });
    }
  });
};

//delete
const fetchDelete_Prom = (api_router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("accessToken");
      const api = api_DNS + api_version + api_router;
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "DELETE",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "no-referrer",
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      reject({ message: "fetchDelete_Prom error", error });
    }
  });
};

const delete_Prom = (api_router) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await fetchDelete_Prom(api_router);
      if (result.status === 401) {
        result = await refreshToken_Prom();
        if (result.status === 200) {
          result = await fetchDelete_Prom(api_router);
        } else {
          result = {
            status: 400,
            message: "您的Token已经过期, 请使用账号密码登陆",
          };
        }
      }
      resolve(result);
    } catch (error) {
      reject({ status: 400, message: "错误" });
    }
  });
};

const refreshToken_Prom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const api = api_DNS + api_version + "/refreshtoken";
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "GET",
      });
      const result = await resPromise.json();
      if (result.status === 200) {
        localStorage.setItem("accessToken", result.data?.accessToken);
      }
      resolve(result);
    } catch (error) {
      reject({ message: "fetchGet_Prom error", error });
    }
  });
};
const logout_Prom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("refreshToken");
      const api = api_DNS + api_version + "/logout";
      const resPromise = await fetch(api, {
        headers: {
          "content-type": "application/json",
          authorization: "accessToken " + token,
        },
        method: "DELETE",
      });
      const result = await resPromise.json();
      resolve(result);
    } catch (error) {
      reject({ message: "fetchGet_Prom error", error });
    }
  });
};

export {
  fetchPost_Prom,
  fetchGet_Prom,
  logout_Prom,
  get_Prom,
  post_Prom,
  put_Prom,
  delete_Prom,
  postFile_Prom,
};
