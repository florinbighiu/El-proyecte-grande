import apiService from "./apiService";

export const getUserInfo = async (setUserInfo) => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;
  try {
    const response = await apiService.get(`/users/${userId}`);
    setUserInfo(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
