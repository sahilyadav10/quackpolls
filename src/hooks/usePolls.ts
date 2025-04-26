import { getPolls } from "@/service/polls";
import { useQuery } from "@tanstack/react-query";

export default function usePolls() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
  });

  const polls = data?.data;

  return { isPending, isError, polls, error };
}
