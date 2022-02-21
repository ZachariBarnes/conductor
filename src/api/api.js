import axios from "axios";
const data = require('/data/content.json');
console.log(data);

export function getData() {
  try{
  return axios.get("/data/content.yml");
  }
  catch (error) {
    console.log(error);
    console.log("trying to load from JSON");
    return data;
  }
}
