import { useQuery } from "react-query";
import axios from "axios";

type InitialData = {
  initialData: {
    stormModeStatus: boolean;
  };
};

const useStormModeStatus = (
  adminPassphrase: string,
  { initialData }: InitialData
) => {
  const query = useQuery(
    "getStormModeStatus",
    async () => {
      const response = await axios.get("/api/getStormModeStatus", {
        headers: {
          "admin-passphrase": adminPassphrase,
        },
      });
      return response.data;
    },
    { initialData: initialData.stormModeStatus }
  );

  return query;
};

export default useStormModeStatus;
