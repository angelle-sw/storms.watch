import { useMutation } from "react-query";
import axios from "axios";

type VideoSource = {
  title: string;
  url: string;
};

const useUpdateVideoSources = () => {
  const storedPassphrase = localStorage.getItem("dashboard-passphrase");

  const query = useMutation((sources: VideoSource[]) =>
    axios.post("/api/postVideoSources", sources, {
      headers: {
        token: storedPassphrase,
      },
    })
  );

  return query;
};

export default useUpdateVideoSources;
