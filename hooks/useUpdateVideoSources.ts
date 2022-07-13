import { useMutation } from "react-query";
import axios from "axios";
import { parse } from "cookie";
import { IVideoSource } from "../types";

const useUpdateVideoSources = () => {
  const adminPassphrase =
    (typeof document === "object" && parse(document.cookie)?.adminPassphrase) ||
    "";

  const query = useMutation(async (sources: IVideoSource[]) => {
    const response = await axios.post("/api/postVideoSources", sources, {
      headers: {
        "admin-passphrase": adminPassphrase,
      },
    });

    return response;
  });

  return query;
};

export default useUpdateVideoSources;
