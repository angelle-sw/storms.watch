import { useQuery } from "react-query";
import axios from "axios";

const useAdmin = (adminPassphrase: string) => {
  const query = useQuery("getAuth", async () => {
    const response = await axios.get("/api/getAuth", {
      headers: {
        "admin-passphrase": adminPassphrase,
      },
    });
    return response.data;
  });

  return query;
};

export default useAdmin;
