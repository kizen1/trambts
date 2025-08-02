import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loading from '@/components/loading'
import { PasswordInput } from '@/components/password-input'
import { getCurrentUser } from '@/features/auth/helpers/auth'
import { useUpdateUser, useUser } from '@/features/users/hooks/users-hooks'

const accountFormSchema = z
  .object({
    email: z
      .string({
        required_error: 'Please enter an email.',
      })
      .email(),
    matKhau: z
      .string()
      .transform((pwd) => pwd.trim())
      .optional(),
    xacNhanMatKhau: z
      .string()
      .transform((pwd) => pwd.trim())
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { matKhau, xacNhanMatKhau } = data

    if (!matKhau && !xacNhanMatKhau) return

    if ((matKhau?.length || 0) < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must be at least 8 characters long.',
        path: ['matKhau'],
      })
    }

    if (!matKhau?.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter.',
        path: ['matKhau'],
      })
    }

    if (!matKhau?.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter.',
        path: ['matKhau'],
      })
    }

    if (!matKhau?.match(/\d/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number.',
        path: ['matKhau'],
      })
    }

    if (!matKhau?.match(/[^a-zA-Z0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character.',
        path: ['matKhau'],
      })
    }

    if (matKhau !== xacNhanMatKhau) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
        path: ['xacNhanMatKhau'],
      })
    }
  })

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
  })

  const currentUser = getCurrentUser()
  const { data: userUpdated, isPending } = useUser(currentUser.id)

  useEffect(() => {
    if (userUpdated) {
      form.reset({
        email: userUpdated.email || '',
        matKhau: '',
        xacNhanMatKhau: '',
      })
    }
  }, [userUpdated, form])

  const updateUser = useUpdateUser(currentUser?.id)

  function onSubmit(data: AccountFormValues): void {
    updateUser.mutate(data)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.matKhau

  if (isPending) <Loading />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='matKhau'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='xacNhanMatKhau'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput disabled={!isPasswordTouched} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending || !form.formState.isDirty}>
          {isPending ? 'Updating...' : 'Update account'}
        </Button>
      </form>
    </Form>
  )
}
