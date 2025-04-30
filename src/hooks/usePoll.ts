import { getPoll } from "@/service/polls";
import { useQuery } from "@tanstack/react-query";

export default function usePoll({ id }: { id: string }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["polls", id],
    queryFn: () => {
      return getPoll(id);
    },
    enabled: !!id,
  });

  const poll = data?.data;

  return { isPending, isError, poll, error };
}
