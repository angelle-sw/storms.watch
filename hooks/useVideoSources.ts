import { useQuery } from "react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

type VideoSource = {
  title: string;
  url: string;
};

const useVideoSources = () => {
  const query = useQuery("getVideoSources", async () => {
    const response = await axios.get("/api/getVideoSources");

    const sourcesWithIds = response.data.map((source: VideoSource) => ({
      ...source,
      id: uuid(),
    }));
    return sourcesWithIds;
  });

  return query;
};

export default useVideoSources;
