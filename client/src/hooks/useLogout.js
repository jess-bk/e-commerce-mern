import axios from "../Api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/api/logout", {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
