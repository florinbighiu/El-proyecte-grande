export const getToken = () => localStorage.getItem("authToken") || "";
export const getUserId = () => localStorage.getItem("userId") || "";
export const getUserRole = () => localStorage.getItem("role") || "";
export const defaultQuantity = 1;
