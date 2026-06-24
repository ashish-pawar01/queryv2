import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../services/historyService";

export const useHistory = () =>
  useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });