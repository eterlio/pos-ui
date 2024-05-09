
import { Meta } from "@/interfaces/route";
import { useOutletContext } from "react-router-dom";

export function useMeta() {
  return useOutletContext<{ meta?: Meta }>();
}
