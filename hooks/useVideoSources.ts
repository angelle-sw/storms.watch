import { useQuery } from "react-query";
import axios from "axios";
import { IVideoSource } from "../types";

type InitialData = {
  initialData: {
    videoSources: IVideoSource[];
  };
};

const useVideoSources = ({ initialData }: InitialData) => {
  const query = useQuery(
    "getVideoSources",
    async () => {
      const { data: videoSources } = await axios.get("/api/getVideoSources");

      return videoSources;
    },
    { initialData: initialData.videoSources }
  );

  return query;
};

export default useVideoSources;
