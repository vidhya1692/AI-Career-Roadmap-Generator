import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-career-roadmap-generator-zx2p.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
