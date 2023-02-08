import axios from "axios";

console.log("axios token loaded");

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmYwYmY2YzVlNTEwYjBjMWFmY2VjZCIsInBob25lIjoiKzI1MTIyMjIyMjIyMiIsImlhdCI6MTY3NTY3NDU5Mn0.4IF3BYlOTcZT9o0X8skhTYc1I2ID3uxoZnjA7NL-kUI"}`,
  },
});
