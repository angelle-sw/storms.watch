import { useMutation } from "react-query";
import axios from "axios";
import { IVideoSource } from "../types";

const useUpdateVideoSources = (adminPassphrase: string) => {
  const query = useMutation((sources: IVideoSource[]) => {
    const response = axios.post("/api/postVideoSources", sources, {
      headers: {
        "admin-passphrase": adminPassphrase,
      },
    });

    return response;
  });

  return query;
};

export default useUpdateVideoSources;
