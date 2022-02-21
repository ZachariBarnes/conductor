import axios from "axios";

export function getData() {
  try{
  return axios.get("/data/content.yml");
  }
  catch (error) {
    console.log(error);
    console.log("trying to load from JSON");
    fetch("/data/content.json")
    .then(response => {
   return response.json();
})
  }
}
