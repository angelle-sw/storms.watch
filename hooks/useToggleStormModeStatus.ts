import { useMutation } from "react-query";
import axios from "axios";
import { parse } from "cookie";

const useToggleStormModeStatus = () => {
  const adminPassphrase =
    (typeof document === "object" && parse(document.cookie)?.adminPassphrase) ||
    "";
  const query = useMutation(async () => {
    const response = await axios.post(
      "/api/toggleStormModeStatus",
      {},
      {
        headers: {
          "admin-passphrase": adminPassphrase,
        },
      }
    );

    return response.data;
  });

  return query;
};

export default useToggleStormModeStatus;
