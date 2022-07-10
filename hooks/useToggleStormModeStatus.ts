import { useMutation } from "react-query";
import axios from "axios";

const useToggleStormModeStatus = (adminPassphrase: string) => {
  // console.log({ adminPassphrase });
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
