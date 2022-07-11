import { useQuery } from "react-query";
import axios from "axios";
import { parse } from "cookie";

type InitialData = {
  initialData: {
    isAdmin: boolean;
  };
};

const useAdmin = ({ initialData }: InitialData) => {
  const adminPassphrase =
    (typeof document === "object" && parse(document.cookie)?.adminPassphrase) ||
    "";

  const query = useQuery(
    "getAdminStatus",
    async () => {
      const response = await axios.get("/api/getAdminStatus", {
        headers: {
          "admin-passphrase": adminPassphrase,
        },
      });

      return response.data;
    },
    { initialData: initialData.isAdmin }
  );

  return query;
};

export default useAdmin;
