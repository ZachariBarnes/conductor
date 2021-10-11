import axios from "axios";

export function getData() {
  return axios.get("/data/content.yml");
}
