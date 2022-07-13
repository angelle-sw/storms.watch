import { useQuery } from "react-query";
import axios from "axios";
import useDebugFlags from "./useDebugFlags";
import useAdmin from "./useAdmin";

type InitialData = {
  initialData?: {
    stormModeStatus: boolean;
  };
};

const useStormModeStatus = (config?: InitialData) => {
  const debugFlags = useDebugFlags();

  const { data: isAdminData } = useAdmin();

  const query = useQuery(
    "getStormModeStatus",
    async () => {
      const response = await axios.get("/api/getStormModeStatus");

      return response.data;
    },
    {
      initialData: config?.initialData?.stormModeStatus,
      enabled: debugFlags?.stormModeStatus === undefined || !isAdminData,
    }
  );

  if (debugFlags?.stormModeStatus !== undefined && isAdminData) {
    return { data: debugFlags.stormModeStatus, refetch: () => {} };
  }

  return query;
};

export default useStormModeStatus;
