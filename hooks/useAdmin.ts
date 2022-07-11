import { useQuery } from "react-query";
import axios from "axios";
import { parse } from "cookie";

const useAdmin = () => {
  const adminPassphrase =
    (typeof document === "object" && parse(document.cookie)?.adminPassphrase) ||
    "";

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
