import { getPoll } from "@/service/polls";
import { useQuery } from "@tanstack/react-query";

export default function usePoll({ id }: { id: string }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["polls"],
    queryFn: () => {
      return getPoll(id);
    },
  });

  const poll = data?.data;

  return { isPending, isError, poll, error };
}
