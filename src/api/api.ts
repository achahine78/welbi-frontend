import axios from "axios";

const BASE_URL = "https://welbi.org/api";

const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "",
  },
});

function addBearerToken(token: string) {
  privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { privateAxios, addBearerToken };
