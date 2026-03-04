import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'
import z from 'zod'

// Create a generic hook that accepts a dynamic schema
export const useZodForm = <T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: DefaultValues<T> | undefined
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    defaultValues,
  })

  return {
    register,
    errors,
    handleSubmit,
    watch,
    reset,
  }
}
