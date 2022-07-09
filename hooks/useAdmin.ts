import { useQuery } from "react-query";
import axios from "axios";

const useAdmin = () => {
  const query = useQuery(
    "getAuth",
    async () => {
      const storedPassphrase = localStorage.getItem("dashboard-passphrase");
      const response = await axios.get("/api/getAuth", {
        headers: {
          token: storedPassphrase,
        },
      });
      return response.data;
    },
    {
      enabled:
        typeof window !== "undefined" && window.localStorage ? true : false,
    }
  );

  return query;
};

export default useAdmin;
