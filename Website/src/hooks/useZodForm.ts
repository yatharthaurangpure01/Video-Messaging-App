import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import z, { ZodType } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";

const useZodForm = <T extends FieldValues>(
  schema: ZodType<T, any, any>,
  mutation: UseMutateFunction<void, unknown, T>,
  defaultValues?: T
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    ...(defaultValues && { defaultValues: defaultValues as any }),
  });

  const onFormSubmit = handleSubmit(async (values) => {
    mutation({ ...values });
  });

  return { register, watch, reset, onFormSubmit, errors};
};

export default useZodForm;
