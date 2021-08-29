import { useQuery } from "react-query";
import axios from "axios";

const useAdmin = () => {
  const storedPassphrase = localStorage.getItem("dashboard-passphrase");

  const query = useQuery("getAuth", async () => {
    const response = await axios.get("/api/getAuth", {
      headers: {
        token: storedPassphrase,
      },
    });
    return response.data;
  });

  return query;
};

export default useAdmin;
