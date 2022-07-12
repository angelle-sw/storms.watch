import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { DebugContext } from "../pages/_app";

const useDebugFlags = () => {
  const router = useRouter();

  const { debugFlags, setDebugFlags } = useContext(DebugContext);

  useEffect(() => {
    if (router.query.stormModeStatus) {
      setDebugFlags({
        stormModeStatus: router.query.stormModeStatus === "true",
      });
    }
  }, [router.query, setDebugFlags]);

  return debugFlags;
};

export default useDebugFlags;
