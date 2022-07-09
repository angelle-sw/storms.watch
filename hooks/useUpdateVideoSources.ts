import { useMutation } from "react-query";
import axios from "axios";

type VideoSource = {
  title: string;
  url: string;
};

const useUpdateVideoSources = () => {
  const query = useMutation((sources: VideoSource[]) => {
    const storedPassphrase = localStorage?.getItem("dashboard-passphrase");
    const response = axios.post("/api/postVideoSources", sources, {
      headers: {
        token: storedPassphrase,
      },
    });

    return response;
  });

  return query;
};

export default useUpdateVideoSources;
