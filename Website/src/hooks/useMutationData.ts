import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export const useMutationData = <TData = unknown, TVariables = unknown>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation<TData, unknown, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (onSuccess) onSuccess();
      const result = data as { status?: number; data?: string };
      return toast(result?.status === 200 || result?.status === 201 ? "Success" : "Error", {
        description: result?.data,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = <TVariables = unknown>(mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as TVariables,
        status: mutation.state.status,
      };
    },
  });

  const latestvariables = data[data.length - 1];
  return { latestvariables };
};
