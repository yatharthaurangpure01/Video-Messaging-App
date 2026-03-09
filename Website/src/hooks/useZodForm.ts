/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { z } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";

const useZodForm = <T extends FieldValues>(
  schema: z.ZodType<any>,
  mutation: UseMutateFunction<any, any, any>,
  defaultValues?: DefaultValues<T>
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema as any) as any,
    ...(defaultValues && { defaultValues: defaultValues }),
  });

  const onFormSubmit = handleSubmit(async (values) => {
    mutation({ ...values } as any);
  });

  return { register, watch, reset, onFormSubmit, errors };
};

export default useZodForm;
