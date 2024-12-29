import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

export const getAllOnlineUsers = async () => {
  return await axios.get(API_URL + "users");
};
// export const deleteBook = async (id) => {
//   return await axios.delete(API_URL + id);
// };
// export const addBook = async (book) => {
//   return await axios.post(API_URL, book);
// };
