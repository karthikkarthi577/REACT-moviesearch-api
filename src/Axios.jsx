import Axios from "axios";

export default Axios.create({
  baseURL: "https://www.omdbapi.com/",
});