import axios from "axios";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("authToken");

export const getUserInfo = async (setUserInfo) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserInfo(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
